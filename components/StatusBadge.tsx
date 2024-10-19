import { StatusIcon } from "@/constants";
import clsx from "clsx";
import Image from "next/image";

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div className="status-badge bg-blue-200">
      <Image
        src={StatusIcon[status]}
        alt={status}
        width={24}
        height={24}
        className="h-fit w-3"
      />
      <p
        className={clsx("test-12-semibold capitalize", {
          "text-green-700": status === "scheduled",
          "text-blue-700": status === "pending",
          "text-red-700": status === "cancelled",
        })}
      >
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
