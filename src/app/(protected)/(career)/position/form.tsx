import { useRouter } from "next/navigation";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { type BaseOption, type HttpError, useSelect, type UseSelectReturnType } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { type IFormConfig } from "@src/common/interface";
import { Form } from "@src/shadcn/components/form";
import { Input } from "@src/shadcn/elements";

import { getDisplayBranchName, getSectorTypeName } from "../branch/lib";
import { type ISectorExpand } from "../sector/interface";

export const PositionForm: React.FC<{ type: string }> = (type) => {
  const branchType = type.type;
  const { form } = useFormPositionConfig(branchType);
  const sector = getSectorOptions(branchType);

  const options = sector.queryResult.data?.data.map((item) => {
    return {
      label: `${getSectorTypeName(item?.type ?? "")} - ${item?.name} - ${item?.branchId?.name} (${getDisplayBranchName(item?.branchId?.type ?? "")}) `,
      value: item.id,
    };
  });
  sector.options = options as BaseOption[];
  return (
    <Form {...form} cardClassName="w-[600px]">
      <div className="text-2xl font-bold tracking-wide text-center text-gray-800 dark:text-white">
        {"ຟອມສ້າງຕໍາແໜ່ງ"}
      </div>
      <Form.Field {...form} name="name" label="ຕໍາແໜ່ງ">
        <Input placeholder="ຕໍາແໜ່ງ" className="block w-full" />
      </Form.Field>
      <SectorSection form={form} sector={sector} />
    </Form>
  );
};

const SectorSection = ({ form, sector }: { form: IFormConfig, sector: any }) => {
  return (
    <div className="inline-flex flex-row items-center justify-start gap-x-4">
      <Form.Field {...form} name="sectorId" label="ພະແນກ/ໜ່ວຍ/ຂະແໜງ">
        <Form.Combobox {...sector} className="w-[550px]" />
      </Form.Field>
    </div>
  );
};

const getSectorOptions = (branchType: string): UseSelectReturnType<ISectorExpand, HttpError, BaseOption> => {
  const branch = branchType === "LOTTERY" ? branchType : "HEADQUARTERS,OFFICE,BRANCH";
  const sector = useSelect<ISectorExpand>({
    resource: "sector",
    optionLabel: "name",
    optionValue: "id",
    filters: [
      { field: "pageSize", operator: "eq", value: 50 },
      { field: "branch_type", operator: "eq", value: branch },
      { field: "expand", operator: "eq", value: "branch_id" },
    ],
  });
  return sector;
};

export const useFormPositionConfig = (branchType: string) => {
  const router = useRouter();
  const { ...form } = useForm<z.infer<typeof positionSchema>>({
    resolver: zodResolver(positionSchema),
    defaultValues: {
      name: "",
      sectorId: 0,
    },
    refineCoreProps: {
      resource: "position",
      redirect: false,
      onMutationSuccess: () => {
        router.back();
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};

export const positionSchema = z.object({
  name: z.string().min(2, {
    message: "ກະລຸໃສຊື່ສາຂາຕໍາແໜງ",
  }),
  sectorId: z.number().min(1, {
    message: "ກະລຸເລືອກ",
  }),
});
