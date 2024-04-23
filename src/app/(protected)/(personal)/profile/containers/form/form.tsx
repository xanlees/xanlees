import React from "react";
import { Form } from "@src/shadcn/components/form";
import { useProfileForm } from "../../hooks/useProfileForm";
import { FormFieldContainer } from "./FormFieldContainer";
interface ProfileFormProps {
  setProfileID?: (id: number) => void
  isEmployee?: boolean
  isEdit?: boolean
  type: string
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  isEmployee = true,
  isEdit = false,
  type,
}) => {
  const { form, state } = useProfileForm(type);
  const isComplete = state?.profileId ?? 0;
  const shouldDisplayForm = !isComplete || isEdit;

  return (
    <div className="rounded-full w-72 sm:w-[710px] ">
      {shouldDisplayForm
        ? (
          <p className="italic">ສຳເລັດແລ້ວ !</p>)
        : (
          <Form {...form}>
            <div className="text-2xl font-bold tracking-wide text-center text-gray-800 dark:text-white">
            ຂໍ້ມູນສ່ວນບຸກຄົນ
            </div>
            <FormFieldContainer form={{ form }} isEmployee={isEmployee} />
            <div className="flex flex-col w-full gap-2 capitalize rounded-lg sm:flex-row sm:w-1/2" />
          </Form>)}
    </div>
  );
};
