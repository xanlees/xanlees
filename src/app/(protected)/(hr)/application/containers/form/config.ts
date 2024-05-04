import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { useApplicationContext } from "../../context";
import { useProfileContext } from "@src/app/(protected)/(personal)";
import * as z from "zod";
import React from "react";
import { type IApplicationSchema } from "../../interface";
import { getErrorMessageNotification } from "@src/common/lib/errorNotification";
import { type ErrorMapMessage, type IMessages } from "@src/common/interface";

export const useFormConfig = () => {
  const { dispatch } = useApplicationContext();
  const { state } = useProfileContext();
  const { ...form } = useForm<{ id?: number, tagId: number }>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      profileId: state?.profileId,
      applicationStatus: "New",
      applicantSignature: false,
      province: 0,
    },
    refineCoreProps: {
      resource: "application",
      redirect: false,
      successNotification: () => {
        return { message: "ສ້າງຂໍ້ມູນສະໝັກຕໍາແຫນ່ງ", type: "success" };
      },
      errorNotification: (data: any) => {
        const responseData = (data as IMessages)?.response?.data;
        return getErrorMessageNotification({ responseData, errorMessages, defaultMessage: "ບໍ່ສາມາດສ້າງ" });
      },
      onMutationSuccess: (data) => {
        dispatch({ type: "setApplicationId", payload: data?.data?.id ?? 0 });
        dispatch({ type: "setTagId", payload: data?.data?.tagId ?? 0 });
      },
    },
    warnWhenUnsavedChanges: true,
  });
  React.useEffect(() => {
    form.setValue("profileId", state?.profileId);
  }, [state?.profileId]);

  return { form, state };
};
export const errorMessages: ErrorMapMessage[] = [
  {
    val: "Ensure that there are no more than 10 digits in total.",
    message: "ເງິນເດືອນຫຼາຍເກິນ 10 ຕົວ",
  },
];

export const useApplicationForm = () => {
  const { state, dispatch } = useApplicationContext();
  const { ...form } = useForm<{ id?: number }>({
    resolver: zodResolver(applicationSelectTwoSchema),
    refineCoreProps: {
      resource: "application",
      redirect: false,
      id: state.applicationId,
      action: "edit",
      onMutationSuccess: (data) => {
        dispatch({ type: "setUpdateApplicationId", payload: data?.data?.id ?? 0 });
      },
      errorNotification: (data: any) => {
        const responseData = (data as IMessages).response.data;
        return getErrorMessageNotification({ responseData, errorMessages, defaultMessage: "ຕ້ອງສ້າງຂໍ້ມຸນການສະໝັກກ່ອນ" });
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form, state };
};

function transformApplication(val: IApplicationSchema): Record<string, any> {
  return {
    ...val,
    expectedSalary: Number(val.expectedSalary.replace(/,/g, "")),
  };
}
export const applicationSchema = z.object({
  profileId: z.number(),
  province: z.number().min(1, { message: "ກະລຸນາເລືອກສາຂາທີຕ້ອງສະໝັກ" }),
  emergencyFullname: z.string().min(2, { message: "ກະລຸນາປ້ອນຂອງຊື່ກໍລະນີ້ສຸກເສີນ" }),
  appliedPosition: z.string().min(2, { message: "ກະລຸນາປ້ອນຕໍາແຫນ່ງທີ່ສະຫມັກ" }),
  expectedSalary: z.string().min(2, { message: "ກະລຸນາປ້ອນເງິນເດືອນທີ່ຕ້ອງການ" }),
  emergencyRelationship: z.string().min(2, { message: "ກະລຸນາປ້ອນຄວາມສາພັນ" }),
  emergencyPhoneNumber: z.string().min(2, { message: "ກະລຸນາປ້ອນເບີໂທ" }),
  applicationStatus: z.string(),
}).transform((val) => transformApplication(val));

export const applicationSelectTwoSchema = z.object({
  typeVaccine: z.string().optional().nullable(),
  vehicleType: z.string().optional().nullable(),
  typeDrivingLicense: z.string().optional().nullable(),
  pledgeReason: z.string().optional().nullable(),
  appliedReason: z.string().optional().nullable(),
  applicantSignature: z.boolean().refine((val) => val, {
    message: "ກົດຍອມຮັບຂໍ້ຕົກລົງເພື່ອໄປຕໍ່",
  }),
});
