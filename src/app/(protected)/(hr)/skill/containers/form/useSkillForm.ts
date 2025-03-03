import * as z from "zod";
import { useApplicationContext } from "../../../application/context";
import { useEffect, useRef } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ErrorMapMessage, type IMessages } from "@src/common/interface";
import { getErrorMessageNotification } from "@src/common/lib/errorNotification";

export const useSkillForm = () => {
  const { state, dispatch } = useApplicationContext();
  const applicationId = state.applicationId ?? 0;
  const prevApplicationIdRef = useRef<number>(applicationId);
  const { ...form } = useForm<{ skill: Array<{ name: string, proficiency: string, application: number }> }>({
    resolver: zodResolver(Schema),
    defaultValues: getDefaultValues(applicationId),
    refineCoreProps: {
      resource: "skill",
      redirect: false,
      onMutationSuccess: (data) => {
        dispatch({ type: "setSkillId", payload: 10 });
      },
      errorNotification: (data: any) => {
        const responseData = (data as IMessages).response.data;
        return getErrorMessageNotification({ responseData, errorMessages, defaultMessage: "ຕ້ອງສ້າງຂໍ້ມຸນການສະໝັກກ່ອນ" });
      },
    },
    warnWhenUnsavedChanges: true,
  });
  useEffect(() => {
    updateApplicationId({ form, applicationId, prevApplicationIdRef });
  }, [applicationId, form]);

  return { form, state };
};
const getDefaultValues = (applicationId: number) => ({
  skill: [
    {
      name: "",
      proficiency: "",
      application: applicationId,
    },
  ],
});

export const Schema = z.object({
  skill: z
    .array(
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

const updateApplicationId = ({
  form,
  applicationId,
  prevApplicationIdRef,
}: {
  form: any
  applicationId: number
  prevApplicationIdRef: React.MutableRefObject<number>
}): void => {
  if (prevApplicationIdRef.current !== applicationId) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    form.setValue("skill[0].application", applicationId);
    prevApplicationIdRef.current = applicationId;
  }
};

const errorMessages: ErrorMapMessage[] = [
  { val: "Invalid pk \"0\" - object does not exist.", message: "ຕ້ອງສ້າງຂໍ້ມຸນຂໍ້ມູນສ່ວນບຸກຄົນກ່ອນ" },
];
