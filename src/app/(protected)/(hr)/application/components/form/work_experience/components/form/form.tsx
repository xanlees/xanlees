import React from "react";
import { type RedirectAction } from "@refinedev/core";
import { Form } from "@src/shadcn/components/form";
import { useFormConfig } from "./config";
import { BaseInput } from "@src/app/(protected)/(hr)/application/containers/form";
import { Textarea } from "@src/shadcn/elements";

interface WorkExperienceFormProps {
  redirect: RedirectAction
  setCurrentStep: any
}

export const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({
  redirect,
  setCurrentStep,
}) => {
  const formConfig = useFormConfig(redirect, setCurrentStep);
  return (
    <div className="rounded-full w-96 sm:w-[36%] ">
      <Form {...formConfig.form}>
        <div className="flex flex-col w-full capitalize rounded-lg sm:w-1/2 sm:flex-row gap-x-2">
          <div className="flex-1">
            <BaseInput {...formConfig} name="company" label="ບໍລິສັດ" />
            <BaseInput {...formConfig} name="position" label="ຕໍາແໜງ" />
          </div>
          <div className="flex-1">
            <BaseInput {...formConfig} name="time" label="time" />{" "}
            <BaseInput {...formConfig} name="salary" label="ເງິນເດືອນ" />
          </div>
        </div>
        <Form.Field {...formConfig.form} name="reasonOfResignation" label="ເຫດຜົນທີ່ລາອອກ">
          <Textarea className="w-full h-28 " />
        </Form.Field>
      </Form>
    </div>
  );
};
