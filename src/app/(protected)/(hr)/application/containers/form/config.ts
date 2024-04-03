import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { useApplicationContext } from "../../context";
import { useProfileContext } from "@src/app/(protected)/(personal)";
import * as z from "zod";

export interface IApplication {
  profileId: number
  emergencyFullname: string
  emergencyRelationship: string
  emergencyPhoneNumber: string
  applicationStatus: string
  appliedPosition: string
  expectedSalary: string
}

interface FormConfigParams {
  isUpdate: boolean
}

export const useFormConfig = ({ isUpdate = false }: FormConfigParams) => {
  const { dispatch } = useApplicationContext();
  const { state } = useProfileContext();
  const { ...form } = useForm<{ id?: number }>({
    resolver: zodResolver(isUpdate ? applicationSelectTwoSchema : applicationSchema),
    defaultValues: {
      profileId: state.profileId,
      applicationStatus: "New",
      applicantSignature: false,
    },
    refineCoreProps: {
      resource: "application",
      redirect: false,
      action: isUpdate ? "edit" : "create",
      id: state.applicationId,
      onMutationSuccess: (data) => {
        if (isUpdate) {
          dispatch({ type: "setUpdateApplicationId", payload: data?.data?.id ?? 0 });
        }
        if (!isUpdate) {
          dispatch({ type: "setApplicationId", payload: data?.data?.id ?? 0 });
        }
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form, state };
};

function transformApplication(val: IApplication): Record<string, any> {
  return {
    ...val,
    expectedSalary: Number(val.expectedSalary.replace(/,/g, "")),
  };
}

export const applicationSchema = z.object({
  profileId: z.number(),
  emergencyFullname: z.string().min(2, {
    message: "ກະລຸນາປ້ອນຂອງຊື່ກໍລະນີ້ສຸກເສີນ",
  }),
  appliedPosition: z.string().min(2, {
    message: "ກະລຸນາປ້ອນຕໍາແຫນ່ງທີ່ສະຫມັກ",
  }),
  expectedSalary: z.string().min(2, {
    message: "ກະລຸນາປ້ອນເງິນເດືອນທີ່ຕ້ອງການ",
  }),
  emergencyRelationship: z.string().min(2, {
    message: "ກະລຸນາປ້ອນຄວາມສາພັນ",
  }),
  emergencyPhoneNumber: z.string().min(2, {
    message: "ກະລຸນາປ້ອນເບີໂທ",
  }),
  applicationStatus: z.string(),
}).transform((val) => transformApplication(val));

export const applicationSelectTwoSchema = z.object({
  typeVaccine: z.string().optional().nullable(),
  typeDrivingLicense: z.string().optional().nullable(),
  pledgeReason: z.string().optional().nullable(),
  appliedReason: z.string().optional().nullable(),
  applicantSignature: z.boolean().refine((val) => val, {
    message: "ກົດຍອມຮັບຂໍ້ຕົກລົງເພື່ອໄປຕໍ່",
  }),
});
