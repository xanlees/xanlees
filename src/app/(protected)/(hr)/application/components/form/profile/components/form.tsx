import React from "react";
import { Form } from "@src/shadcn/components/form";
import { useFormConfig } from "./config";
import { BasicInformationSection } from "../containers/form/BasicInformationSection";
import { PersonalInformationSection } from "../containers/form/PersonalInformationSection";

interface ProfileFormProps {
  setCurrentStep?: (step: number) => void
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ setCurrentStep }) => {
  const formConfig = useFormConfig({ setCurrentStep });
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
