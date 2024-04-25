import { FC } from "react";
import React from "react";
import { useRouter } from "next/navigation";
export const WebVersion: FC = () => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push(`/changelog`);
  };
  return (
    <button
      onClick={handleButtonClick}
      className="mx-5 -my-2 italic text-blue-500 underline"
    >
      Version: 0.5.0
    </button>
  );
};
