import React from "react";
import { Form } from "@src/shadcn/components/form";
import { useFormAgent } from "../../hook";
import { InputContainer } from "./fields";

export const ProfileForm: React.FC = () => {
  const { form, state } = useFormAgent();
  const isComplete = state?.profileId ?? 0;
  return (
    <div className="rounded-full w-96 sm:w-[710px]  ">
      {isComplete
        ? (<p className="italic">ສຳເລັດແລ້ວ !</p>)
        : (
          <Form {...form}>
            <div className="text-2xl font-bold tracking-wide text-center text-gray-800 dark:text-white">
           ຂໍ້ມູນສ່ວນບຸກຄົນ
            </div>
            <InputContainer form={{ form }} />
            <div className="flex flex-col w-full gap-2 capitalize rounded-lg sm:flex-row sm:w-1/2" />
          </Form>)}
    </div>
  );
};
