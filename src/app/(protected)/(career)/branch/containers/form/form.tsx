import React from "react";
import { Form } from "@src/shadcn/components/form";
import { FormBranch } from "./form/form";
import { FormSector } from "../../../sector/form/form";
import { Input } from "@src/shadcn/elements";
import { useFormPositionConfig } from "./form/config";
import { useSelect, type BaseOption } from "@refinedev/core";
import { type ISector } from "../../interface";
import { SectorSection } from "./positionCreate";

export const BranchForm: React.FC<{ type: string }> = (type) => {
  const branchType = type.type;
  const formConfig = useFormPositionConfig();
  const sector = useSelect<ISector>({
    resource: "sector",
    optionLabel: "name",
    optionValue: "id",
    filters: [
      { field: "pageSize", operator: "eq", value: 50 },
      { field: "branch_type", operator: "eq", value: branchType },
    ],
  });
  const options = sector.queryResult.data?.data.map((item) => {
    return {
      label: `${item?.name} - ${item?.branchId?.name}`,
      value: item.id,
    };
  });
  sector.options = options as BaseOption[];
  return (
    <div className=" p-10 rounded-full my-3">
      <Form {...formConfig.form} cardClassName="w-[600px]">
        <Form.Field {...formConfig.form} name="name" label="ຕໍາແໜ່ງ">
          <Input placeholder="ຕໍາແໜ່ງ" className="block w-full" />
        </Form.Field>
        <SectorSection formConfig={formConfig} sector={sector} />
      </Form>
      <FormSector />
      <FormBranch type={branchType} />
    </div>
  );
};
