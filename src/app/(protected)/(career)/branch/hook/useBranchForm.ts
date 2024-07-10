import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useList, useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

import { type ErrorMapMessage, type IMessages } from "@src/common/interface";
import { getErrorMessageNotification } from "@src/common/lib/errorNotification";
import { type IDistrict } from "@personal";
import { type IBranch } from "../interface";

export const useBranchForm = ({ type, id }: { type: string, id?: number }) => {
  const action = id ? "edit" : "create";
  const router = useRouter();
  const { ...form } = useForm<z.infer<typeof branchSchema>>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      type,
      name: "",
      province: 0,
      latitude: "",
      longitude: "",
      radius: "",
    },
    refineCoreProps: {
      resource: "branch",
      redirect: false,
      action,
      id,
      onMutationSuccess: (data) => {
        if (action === "edit") {
          router.back();
        }
      },
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
  longitude: z.number().or(z.string().min(1, { message: "ກະລຸນາປ້ອນເສັ້ນແວງ" })),
  latitude: z.number().or(z.string().min(1, { message: "ກະລຸນາປ້ອນເສັ້ນຂະໜານ" })),
  radius: z.number().or(z.string().min(1, { message: "ກະລຸນາປ້ອນລັດສະໝີ" })),
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
      { field: "paginate", operator: "eq", value: false },
    ],
  });
};

export function useBranchType({ id }: { id: number }) {
  return useList<IBranch>({
    resource: "branch",
    filters: [
      { field: "id", operator: "eq", value: id },
      { field: "fields", operator: "eq", value: "type,id" },
    ],
    errorNotification: false,
  });
}

export const provinceName = "ນະຄອນຫຼວງວຽງຈັນ,ແຂວງຜົ້ງສາລີ,ແຂວງຫຼວງນໍ້າທາ,ແຂວງອຸດົມໄຊ,ແຂວງບໍ່ແກ້ວ,ແຂວງຫຼວງພະບາງ,ແຂວງຫົວພັນ,ແຂວງໄຊຍະບູລີ,ແຂວງຊຽງຂວາງ,ແຂວງວຽງຈັນ,ແຂວງບໍລິຄຳໄຊ,ແຂວງຄຳມ່ວນ,ແຂວງສະຫວັນນະເຂດ,ແຂວງສາລະວັນ,ແຂວງເຊກອງ,ແຂວງຈຳປາສັກ,ແຂວງອັດຕະປື,ແຂວງໄຊສົມບູນ";

