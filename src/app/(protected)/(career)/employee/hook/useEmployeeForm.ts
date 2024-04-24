import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { type IFormConfig } from "@src/common/interface";
import { type UseFormSetValue } from "react-hook-form";

export const useFormConfig = ({ type, profile }: { type?: string, profile: number }) => {
  const redirect = type === "LOTTERY" ? "/agent" : `/user/create/${profile}`;
  const router = useRouter();
  const { ...form } = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      employee: [
        {
          positionId: 0,
          joiningDate: "",
          isLatest: false,
          profileId: profile,
        },
      ],
    },
    refineCoreProps: {
      resource: "employee",
      onMutationSuccess: () => {
        router.push(redirect);
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
        positionId: z.number().min(1, {
          message: "ກະລຸນາເລືອກຕໍາແໜ່ງ",
        }),
        profileId: z.number(),
        isLatest: z.boolean().default(false),
        joiningDate: z.date().transform((value) => new Date(value).toISOString()),
      }),
    ),
}).transform((val) => {
  return val.employee;
});

const useUpdateDefaultValues = (form: IFormConfig & { setValue?: UseFormSetValue<any> }, profile: number) => {
  const profileRef = useRef(profile);
  useEffect(() => {
    if (profileRef.current !== profile && form.setValue) {
      form.setValue("employee[0].profileId", profile);
    }
  }, [profile, form.setValue]);
};
