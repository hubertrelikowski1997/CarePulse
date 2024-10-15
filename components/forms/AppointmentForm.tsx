"use client";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";

const AppointmentForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const newUser = await createUser(user);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">
            Request a new appointment in 10 seconds
          </p>
        </section>

        {/* SelectDoctor */}
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Select Doctor"
          placeholder="Select Doctor"
        >
          {Doctors.map(({ name, image }) => (
            <SelectItem key={name} value={name}>
              <div className="flex cursor-pointer items-center gap-2">
                <Image
                  src={image}
                  alt="doctor"
                  width={32}
                  height={32}
                  className="rounded-full border border-dark-500"
                />
                <p>{name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <div className=" flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="allergies"
            label="Reason for appointment"
            placeholder="ex: Annual montly check-up"
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="currentMedications"
            label="Additional comments/notes"
            placeholder="ex: Prefer afternoon appointments, if possible"
          />
        </div>

        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="birthDate"
          label="Select your appointment date"
        />

        <SubmitButton isLoading={isLoading}>Submit and continue</SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
