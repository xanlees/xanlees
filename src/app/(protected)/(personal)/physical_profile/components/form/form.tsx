import React from "react";
import { Form } from "@src/shadcn/components/form";
import { useFormConfig } from "./config";
import { InputBase } from "@src/common/elements/input/InputBase";

interface PhysicalProfileProps {
  setCurrentStep?: (step: number) => void
}

export const PhysicalProfile: React.FC<PhysicalProfileProps> = ({
  setCurrentStep,
}) => {
  const formConfig = useFormConfig({ setCurrentStep });
  return (
    <div className="rounded-full w-96 sm:w-[38%] ">
      <Form {...formConfig.form}>
        <div className="flex flex-col w-full capitalize rounded-lg sm:flex-row">
          <div className="flex-1 p-4">
            <div className="flex gap-2">
              <div className="w-full">
                <InputBase {...formConfig} name="height" label="ລວງສູງ" placeholder="ປ້ອນຄວາມສູງ" type="number"/>
              </div>
              <div className="w-2 pt-7 ">cm</div>
            </div>
            <InputBase {...formConfig} name="nationality" label="ສັນຊາດ" placeholder="ປ້ອນສັນຊາດ"/>
          </div>
          <div className="flex-1 p-4">
            <div className="flex gap-2">
              <div className="w-full">
                <InputBase {...formConfig} name="weight" label="ນໍ້າຫນັກ" placeholder="ປ້ອນນໍ້າຫນັກ" type="number"/>
              </div>
              <div className="w-2 pt-7 ">kg</div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};
