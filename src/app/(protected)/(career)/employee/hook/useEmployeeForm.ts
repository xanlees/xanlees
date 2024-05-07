import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { type IMessages, type IFormConfig, type ErrorMapMessage } from "@src/common/interface";
import { type UseFormSetValue } from "react-hook-form";
import { useList, type BaseRecord, type GetListResponse } from "@refinedev/core";
import { getErrorMessageNotification } from "@src/common/lib/errorNotification";

export const useFormConfig = ({ type, profile, redirect }: { type?: string, profile: number, redirect?: string }) => {
  let redirectPatch = "";
  if (redirect === "agent") {
    redirectPatch = "/agent";
  } else if (redirect === "user") {
    redirectPatch = `/user/create/${profile}/profile`;
  } else if (redirect === "profile") {
    redirectPatch = "/profile";
  }
  const router = useRouter();
  const { ...form } = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      employee: [
        { positionId: 0, joiningDate: "", isLatest: false, profileId: profile, salary: 0 },
      ],
    },
    refineCoreProps: {
      resource: "employee",
      onMutationSuccess: () => {
        router.push(redirectPatch);
      },
      errorNotification: (data: any) => {
        const responseData = (data as IMessages).response.data;
        return getErrorMessageNotification({ responseData, errorMessages, defaultMessage: "ຕໍາແໜ່ງລ່າສຸດສາມາດມີໄດ້ຕໍາແໜ່ງດຽວ ຫຼື ເງິນຫຼາຍເກີນ 10 ໂຕ" });
      },
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  useUpdateDefaultValues(form as any, profile);
  return { form };
};

const employeeSchema = z.object({
  employee: z
    .array(
      z.object({
        positionId: z.number().min(1, { message: "ກະລຸນາເລືອກຕໍາແໜ່ງ" }),
        salary: z.union([z.number(), z.string()]).transform((value): number | string => {
          if (typeof value === "string") {
            return value.replace(/,/g, "");
          }
          return value;
        }),
        profileId: z.number(),
        isLatest: z.boolean().default(false),
        joiningDate: z.date().transform((value) => new Date(value).toISOString()),
      }),
    ),
}).transform((val) => {
  return val.employee;
});
const errorMessages: ErrorMapMessage[] = [
  { val: "There can only be one 'latest' employee record per profile.", message: "ຕໍາແໜ່ງລ່າສຸດສາມາດມີໄດ້ຕໍາແໜ່ງດຽວ ຫຼື ເງິນຫຼາຍເກີນ 10 ໂຕ" },
];

const useUpdateDefaultValues = (form: IFormConfig & { setValue?: UseFormSetValue<any> }, profile: number) => {
  const profileRef = useRef(profile);
  useEffect(() => {
    if (profileRef.current !== profile && form.setValue) {
      form.setValue("employee[0].profileId", profile);
    }
  }, [profile, form.setValue]);
};

export function useEmployeeEdit<T extends BaseRecord>({ id }: { id: number }): GetListResponse<T> | typeof defaultData {
  const { data } = useList<T>({
    resource: "employee",
    filters: [
      { field: "expand", operator: "eq", value: "branch_id" },
      { field: "id", operator: "eq", value: id },
    ],
    errorNotification: false,
  });
  const defaultData = { data: [], total: 0 };
  return data ?? defaultData;
}

