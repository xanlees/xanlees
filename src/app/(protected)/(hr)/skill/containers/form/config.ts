import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { useApplicationContext } from "../../../application/context";
import * as z from "zod";
import { useEffect, useRef } from "react";
import { type IFormConfig } from "@src/common/interface";

export const useFormConfig = () => {
  const { state, dispatch } = useApplicationContext();
  const applicationId = state.applicationId ?? 0;
  const { ...form } = useForm<{ id?: number }>({
    defaultValues: {
      skill: [
        {
          application: state.applicationId,
          proficiency: "",
          name: "",
        },
      ],
    },
    resolver: zodResolver(Schema),
    refineCoreProps: {
      resource: "skill",
      redirect: false,
      onMutationSuccess: (data) => {
        dispatch({ type: "setSkillId", payload: 10 });
      },
    },
    warnWhenUnsavedChanges: true,
  });
  useUpdateDefaultValues(form as any, applicationId);
  return { form, state };
};
const useUpdateDefaultValues = (form: IFormConfig, applicationId: number) => {
  const applicationIdRef = useRef(applicationId);
  useEffect(() => {
    if (applicationIdRef.current !== applicationId) {
      form.setValue("skill[0].application", applicationId);
      applicationIdRef.current = applicationId;
    }
  }, [applicationId]);
};

export const Schema = z.object({
  skill:
    z.array(
      z.object({
        name: z.string().min(1, {
          message: "ກະລຸນາປ້ອນຊື່ບໍລິສັດ",
        }),
        proficiency: z.string().min(1, {
          message: "ກະລຸນາປ້ອນຕໍາແໜ່ງ",
        }),
        application: z.number(),
      }),
    ),
}).transform((val) => {
  const List = val.skill;
  return List;
});
