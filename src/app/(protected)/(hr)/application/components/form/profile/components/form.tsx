import React from "react";
import { type RedirectAction } from "@refinedev/core";
import { Form } from "@src/shadcn/components/form";
import { useFormConfig } from "./config";
import { BasicInformationSection } from "../containers/form/BasicInformationSection";
import { PersonalInformationSection } from "../containers/form/PersonalInformationSection";

interface ProfileFormProps {
  redirect: RedirectAction
  setCurrentStep?: (step: number) => void
}
export const ProfileForm: React.FC<ProfileFormProps> = ({
  redirect,
  setCurrentStep,
}) => {
  const formConfig = useFormConfig({ redirect, setCurrentStep });
  return (
    <div className="w-[39%] rounded-full ">
      <Form {...formConfig.form}>
        <div className="flex flex-col w-full capitalize rounded-lg sm:w-1/2 sm:flex-row">
          <BasicInformationSection formConfig={formConfig} />
          <PersonalInformationSection formConfig={formConfig} />
        </div>
      </Form>
    </div>
  );
};
