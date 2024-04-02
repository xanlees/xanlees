import React from "react";
import { Form } from "@src/shadcn/components/form";
import { useFormAgent } from "../../hooks/useFormAgent";
import { InputContainer } from "./fields";

export const ProfileForm: React.FC = () => {
  const { form } = useFormAgent();
  return (
    <div className="rounded-full w-96 sm:w-[710px] mx-20 ">
      <Form {...form}>
        <div className="text-2xl font-bold tracking-wide text-center text-gray-800 dark:text-white">
          ຂໍ້ມູນສ່ວນບຸກຄົນ
        </div>
        <InputContainer form={{ form }} />
        <div className="flex flex-col w-full gap-2 capitalize rounded-lg sm:flex-row sm:w-1/2" />
      </Form>
    </div>
  );
};
