import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { useApplicationContext } from "../../../application/context";
import * as z from "zod";
import React from "react";

export const useFormConfig = () => {
  const { state, dispatch } = useApplicationContext();
  const { ...form } = useForm<{ id?: number }>({
    defaultValues: {
      skill: [
        {
          name: "",
          proficiency: "",
          application: state.applicationId,
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
  React.useEffect(() => {
    form.setValue("skill[0].application", state.applicationId);
  }, [state.applicationId]);

  return { form, state };
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
