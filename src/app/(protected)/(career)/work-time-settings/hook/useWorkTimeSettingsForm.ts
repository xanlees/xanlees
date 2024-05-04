import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { type UseFormSetValue } from "react-hook-form";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { type ErrorMapMessage, type IFormConfig, type IMessages } from "@src/common/interface";
import { getErrorMessageNotification } from "@src/common/lib/errorNotification";

export const useWorkTimeSettingsForm = () => {
  const router = useRouter();
  const branch = 0;
  const { ...form } = useForm<z.infer<typeof workTimeSettingsSchema>>({
    resolver: zodResolver(workTimeSettingsSchema),
    defaultValues: {
      branch: 0,
      lateTime: "",
      workTimeSettings: [
        {
          dayOfWeek: "",
          checkInTime: "",
          checkOutTime: "",
        },
      ],
    },
    refineCoreProps: {
      resource: "branch/work-time-settings",
      redirect: false,
      onMutationSuccess: () => {
        router.back();
      },
      errorNotification: (data: any) => {
        const responseData = (data as IMessages).response.data;
        const defaultMessage = "ມື້ຊໍ້າ ຫຼື ມີແລ້ວ";
        return getErrorMessageNotification({ responseData, errorMessages: errorMessagesProfile, defaultMessage });
      },
    },
    warnWhenUnsavedChanges: true,
  });
  useUpdateDefaultValues(form as any, branch);
  return { form };
};

export const errorMessagesProfile: ErrorMapMessage[] = [
  { val: "The fields day_of_week, branch must make a unique set.", message: "ມື້ຊໍ້າ ຫຼື ມີແລ້ວ" },
  { val: "The fields day_of_week, branch must make a unique set.", message: "ມື້ຊໍ້າ ຫຼື ມີແລ້ວ" },
];
const workTimeSettingsSchema = z.object({
  branch: z.number().min(1, {
    message: "ກະລຸນາເລືອກຫ້ອງການ",
  }),
  lateTime: z.string().min(1, {
    message: "ກະລຸນາຕັ້ງເວລາຊ້າ ຢ່າງນ້ອຍ 1 ນາທີ",
  }),
  workTimeSettings: z.array(
    z.object({
      dayOfWeek: z.string().min(1, { message: "ກະລຸນາເລືອກມື້" }),
      checkInTime: z.string().min(1, { message: "ກະລຸນາເລືອກເວລາເຂົ້າວຽກ" }),
      checkOutTime: z.string().min(1, { message: "ກະລຸນາເລືອກເວລາເລີກວຽກ" }),
    }),
  ),
}).transform((original) => {
  return transformWorkTimeData(original);
});

const useUpdateDefaultValues = (form: IFormConfig & { setValue?: UseFormSetValue<any> }, branch: number) => {
  const branchRef = useRef(branch);
  useEffect(() => {
    if (branchRef.current !== branch && form.setValue) {
      form.setValue("branch", branch);
      branchRef.current = branch;
    }
  }, [branch, form.setValue]);
};

function transformWorkTimeData(original: IWorkTimeSettingsSchema) {
  return original.workTimeSettings.map((item) => ({
    branch: original.branch,
    checkInTime: item.checkInTime,
    checkOutTime: item.checkOutTime,
    lateTime: original.lateTime,
    dayOfWeek: item.dayOfWeek,
  }));
}

interface IWorkTimeSettingsSchema {
  branch: number
  lateTime: string | null
  workTimeSettings: Array<{
    dayOfWeek: string
    checkInTime: string
    checkOutTime: string
  }>
}
