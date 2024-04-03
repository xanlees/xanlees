import React from "react";
import { Form } from "@src/shadcn/components/form";

import { type IFormConfig } from "@src/common/interface";

export const SectorSection = ({
  formConfig,
  sector,
}: {
  formConfig: IFormConfig
  sector: any
}) => (
  <div className="inline-flex flex-row items-center justify-start gap-x-4">
    <Form.Field {...formConfig.form} name="sectorId" label="ເລືອກຂະແໜງ">
      <Form.Combobox {...sector} />
    </Form.Field>
  </div>
);
