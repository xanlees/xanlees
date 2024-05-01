import { useSelect, type BaseOption, type HttpError, type UseSelectReturnType } from "@refinedev/core";
import { type ISectorExpand } from "../sector/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@src/shadcn/elements";
import { Form } from "@src/shadcn/components/form";
import { useForm } from "@refinedev/react-hook-form";
import { type IFormConfig } from "@src/common/interface";
import { useRouter } from "next/navigation";
export const PositionForm: React.FC<{ type: string }> = (type) => {
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
    <Form {...form} cardClassName="w-[600px]">
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
      <Form.Field {...form} name="sectorId" label="ພະແນກ/ໜ່ວຍ">
        <Form.Combobox {...sector} />
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
