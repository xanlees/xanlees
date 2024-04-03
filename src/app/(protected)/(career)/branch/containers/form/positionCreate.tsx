/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from "react";
import {
  useSelect,
  type RedirectAction,
  type BaseOption,
} from "@refinedev/core";
import { Card, Input } from "@src/shadcn/elements";
import { Form } from "@src/shadcn/components/form";
import { useFormPositionConfig } from "./form/config";
import { type ISector } from "../../interface";
import { type IFormConfig } from "@src/common/interface";
import { FormSector } from "../../../sector/form/form";

interface PositionFormProps {
  redirect: RedirectAction
}
export const PositionCreate: React.FC<PositionFormProps> = ({ redirect }) => {
  const formConfig = useFormPositionConfig(redirect);
  const sector = useSelect<ISector>({
    resource: "sector",
    optionLabel: "name",
    optionValue: "id",
    filters: [{ field: "pageSize", operator: "eq", value: 50 }],
  });
  const options = sector.queryResult.data?.data.map((item) => {
    return {
      label: `${item?.name} - ${item?.branchDetail?.name}`,
      value: item.id,
    };
  });
  sector.options = options as BaseOption[];
  return (
    <div className="w-1/3 mx-auto">
      <div className="w-full">
        <Form {...formConfig.form}>
          <div className="w-full">
            <Form.Field {...formConfig.form} name="name" label="ຕໍາແໜ່ງ">
              <Input placeholder="ຕໍາແໜ່ງ" className="block w-full" />
            </Form.Field>
          </div>
          <SectorSection formConfig={formConfig} sector={sector} />
        </Form>
      </div>
      <Card className="p-2 mt-2 rounded-lg">
        <FormSector />
      </Card>
    </div>
  );
};

const SectorSection = ({
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
