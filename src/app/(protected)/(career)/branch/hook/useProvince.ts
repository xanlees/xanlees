import { useSelect } from "@refinedev/core";
import { type IDistrict } from "@src/app/(protected)/(personal)/address/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import * as z from "zod";
import { type IMessages, type ErrorMapMessage } from "@src/common/interface";
import { getErrorMessageNotification } from "@src/common/lib/errorNotification";

export const useFormBranch = (type: string) => {
  const { ...form } = useForm<z.infer<typeof branchSchema>>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      type,
      name: "",
      province: 0,
    },
    refineCoreProps: {
      resource: "branch",
      redirect: false,
      errorNotification: (data: any) => {
        const responseData = (data as IMessages).response.data;
        return getErrorMessageNotification({ responseData, errorMessages, defaultMessage: "" });
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};

export const branchSchema = z.object({
  name: z.string().min(2, {
    message: "ກະລຸໃສຊື່ສາຂາ",
  }),
  type: z.string().min(1, {
    message: "ກະລຸເລືອກປະເພດຫ້ອງການ",
  }),
  province: z.number().min(1, {
    message: "ກະລຸເລືອກແຂວງ",
  }),
});

const errorMessages: ErrorMapMessage[] = [
  { val: "The fields name, type, province must make a unique set.", message: "ຂໍ້ມູນຊໍ້າ" },
];

export const useProvinceSelect = () => {
  return useSelect<IDistrict>({
    resource: "district",
    optionLabel: "provinceName",
    optionValue: "id",
    errorNotification: false,
    filters: [
      { field: "province", operator: "eq", value: provinceName },
      { field: "page_size", operator: "eq", value: 100 },
    ],
  });
};

export const provinceName = "ນະຄອນຫຼວງວຽງຈັນ,ແຂວງຜົ້ງສາລີ,ແຂວງຫຼວງນໍ້າທາ,ແຂວງອຸດົມໄຊ,ແຂວງບໍ່ແກ້ວ,ແຂວງຫຼວງພະບາງ,ແຂວງຫົວພັນ,ແຂວງໄຊຍະບູລີ,ແຂວງຊຽງຂວາງ,ແຂວງວຽງຈັນ,ແຂວງບໍລິຄຳໄຊ,ແຂວງຄຳມ່ວນ,ແຂວງສະຫວັນນະເຂດ,ແຂວງສາລະວັນ,ແຂວງເຊກອງ,ແຂວງຈຳປາສັກ,ແຂວງອັດຕະປື,ແຂວງໄຊສົມບູນ";
