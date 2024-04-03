import React from "react";
import { Form } from "@src/shadcn/components/form";
import { useFormConfig } from "./config";
import { InputBase } from "@src/common/elements/input/InputBase";

export const PhysicalProfile: React.FC<PhysicalProfileProps> = () => {
  const formConfig = useFormConfig();
  const isCompleted = formConfig.state.physicalProfileId;
  return (
    <div className="mx-20 rounded-full">
      {!isCompleted
        ? (<Form {...formConfig.form}>
          <div className="flex flex-col w-full capitalize rounded-lg sm:flex-row">
            <div className="flex-1 p-4">
              <div className="flex gap-2">
                <div className="w-full">
                  <InputBase {...formConfig} name="height" label="ລວງສູງ" placeholder="ປ້ອນຄວາມສູງ" type="number" require={false}/>
                </div>
                <div className="w-2 pt-7 ">cm</div>
              </div>
              <InputBase {...formConfig} name="nationality" label="ສັນຊາດ" placeholder="ປ້ອນສັນຊາດ" />
            </div>
            <div className="flex-1 p-4">
              <div className="flex gap-2">
                <div className="w-full">
                  <InputBase {...formConfig} name="weight" label="ນໍ້າຫນັກ" placeholder="ປ້ອນນໍ້າຫນັກ" type="number" require={false}/>
                </div>
                <div className="w-2 pt-7 ">kg</div>
              </div>
            </div>
          </div>
        </Form>)
        : (<p className="italic">ສຳເລັດແລ້ວ !</p>) }
    </div>
  );
};
