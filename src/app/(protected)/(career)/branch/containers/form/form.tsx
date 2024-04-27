import React from "react";
import { Form } from "@src/shadcn/components/form";
import { FormBranch } from "./form/form";
import { FormSector } from "../../../sector/form/form";
import { Input } from "@src/shadcn/elements";
import { useFormPositionConfig } from "./form/config";
import { type HttpError, useSelect, type BaseOption, type UseSelectReturnType } from "@refinedev/core";
import { type ISector } from "../../../index";
import { type IFormConfig } from "@src/common/interface";

export const BranchForm: React.FC<{ type: string }> = (type) => {
  console.log("type", type);
  const branchType = type.type;
  const { form } = useFormPositionConfig(branchType);
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
      <Form {...form} cardClassName="w-[600px]">
        <Form.Field {...form} name="name" label="ຕໍາແໜ່ງ">
          <Input placeholder="ຕໍາແໜ່ງ" className="block w-full" />
        </Form.Field>
        <SectorSection form={form} sector={sector} />
      </Form>
      <FormSector branchType={branchType} {...type} />
      <FormBranch type={branchType} />
    </div>
  );
};

export const SectorSection = ({ form, sector }: { form: IFormConfig, sector: any }) => {
  return (
    <div className="inline-flex flex-row items-center justify-start gap-x-4">
      <Form.Field {...form} name="sectorId" label="ພະແນກ/ໜ່ວຍ">
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
