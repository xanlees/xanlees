import { Form } from "@src/shadcn/components/form";
import React from "react";
import { type IFormConfig } from "@src/common/interface";

export const PositionSection = ({
  formConfig,
  position,
}: {
  formConfig: IFormConfig
  position: any
}) => (
  <div className="inline-flex flex-row items-center justify-start gap-x-4">
    <Form.Field {...formConfig.form} name="positionId" label="ຕໍາແໜ່ງ">
      <Form.Combobox
        className="w-80"
        {...position}
        onChange={(value) => {
          formConfig.form.setValue("positionId", value);
        }}
      />
    </Form.Field>
  </div>
);
