import { useList, useSelect, type BaseRecord, type GetListResponse } from "@refinedev/core";
import * as z from "zod";
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type IBranch } from "../../sector/interface";

export function useWorkTimeSettings<T extends BaseRecord>({ branchId }: { branchId: number }): GetListResponse<T> | typeof defaultData {
  const { data } = useList<T>({
    resource: "branch/work-time-settings",
    filters: [
      { field: "branch", operator: "eq", value: branchId },
    ],
    errorNotification: false,
  });
  const defaultData = {
    data: [],
    total: 0,
  };
  return data ?? defaultData;
}

export const useBranchFormSelect = () => {
  return useSelect<IBranch>({
    resource: "branch",
    optionLabel: "name",
    optionValue: "id",
    filters: [{ field: "pageSize", operator: "eq", value: false }],
  });
};

export const useWorkTimeSettingsEditForm = ({ settingId, editLateTime }: { settingId: number, editLateTime: boolean }) => {
  const { ...form } = useForm<z.infer<typeof workTimeSettingsSchema>>({
    resolver: zodResolver(editLateTime ? workTimeSettingsSchema : workTimeSettingsSchemaLateTime),
    defaultValues: {
      branch: 0,
      lateTime: "",
      checkOutTime: "",
    },
    refineCoreProps: {
      resource: "branch/work-time-settings",
      redirect: false,
      id: settingId,
      action: "edit",
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};

const workTimeSettingsSchema = z.object({
  branch: z.number().min(1, {
    message: "ກະລຸນາເລືອກຫ້ອງການ",
  }),
  lateTime: z.nullable(z.string()),
  checkInTime: z.string().min(1, { message: "ກະລຸນາເລືອກເວລາເຂົ້າວຽກ" }),
  checkOutTime: z.string().min(1, { message: "ກະລຸນາເລືອກເວລາເລີກວຽກ" }),
});

const workTimeSettingsSchemaLateTime = z.object({
  branch: z.number().min(1, {
    message: "ກະລຸນາເລືອກຫ້ອງການ",
  }),
  lateTime: z.nullable(z.string()),
});
