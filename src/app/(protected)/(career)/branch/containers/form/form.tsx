import React from "react";
import { Form } from "@src/shadcn/components/form";
import { FormBranch } from "./form/form";
import { FormSector } from "../../../sector/form/form";
import { Input } from "@src/shadcn/elements";
import { useFormPositionConfig } from "./form/config";
import { type HttpError, useSelect, type BaseOption, type UseSelectReturnType } from "@refinedev/core";
import { type ISector } from "../../..";
import { type IFormConfig } from "@src/common/interface";

export const BranchForm: React.FC<{ type: string }> = (type) => {
  const branchType = type.type;
  const formConfig = useFormPositionConfig(branchType);
  const sector = getSectorOptions(branchType);
  const options = sector.queryResult.data?.data.map((item) => {
    return {
      label: `${item?.name} - ${item?.branchId?.name}`,
      value: item.id,
    };
  });
  sector.options = options as BaseOption[];
  return (
    <div className="p-10 my-3 rounded-full ">
      <Form {...formConfig.form} cardClassName="w-[600px]">
        <Form.Field {...formConfig.form} name="name" label="ຕໍາແໜ່ງ">
          <Input placeholder="ຕໍາແໜ່ງ" className="block w-full" />
        </Form.Field>
        <SectorSection formConfig={formConfig} sector={sector} />
      </Form>
      <FormSector branchType={branchType} />
      <FormBranch type={branchType} />
    </div>
  );
};

export const SectorSection = ({ formConfig, sector }: { formConfig: IFormConfig, sector: any }) => {
  return (
    <div className="inline-flex flex-row items-center justify-start gap-x-4">
      <Form.Field {...formConfig.form} name="sectorId" label="ເລືອກຂະແໜງ">
        <Form.Combobox {...sector} />
      </Form.Field>
    </div>
  );
};

const getSectorOptions = (branchType: string): UseSelectReturnType<ISector, HttpError, BaseOption> => {
  const sector = useSelect<ISector>({
    resource: "sector",
    optionLabel: "name",
    optionValue: "id",
    filters: [
      { field: "pageSize", operator: "eq", value: 50 },
      { field: "branch_type", operator: "eq", value: branchType },
      { field: "expand", operator: "eq", value: "branch_id" },
    ],
  });
  return sector;
};
