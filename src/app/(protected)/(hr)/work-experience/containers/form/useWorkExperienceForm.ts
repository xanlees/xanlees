import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { useApplicationContext } from "../../../application/context";
import * as z from "zod";
import { useEffect, useRef } from "react";
import { type ErrorMapMessage, type IMessages, type IFormConfig } from "@src/common/interface";
import { type UseFormSetValue } from "react-hook-form";
import { getErrorMessageNotification } from "@src/common/lib/errorNotification";

interface WorkExperienceData {
  id: number
}

interface WorkExperienceProps {
  id: number
  data: WorkExperienceData[]
}

export const useWorkExperienceForm = () => {
  const { state, dispatch } = useApplicationContext();
  const applicationId = state.applicationId ?? 0;
  const { ...form } = useForm<WorkExperienceProps>({
    resolver: zodResolver(WorkExperienceSchema),
    defaultValues: {
      experience: [
        { applicationId: 0, company: "", position: "", time: "", salary: "", reasonOfResignation: "" },
      ],
    },
    refineCoreProps: {
      resource: "work_experience",
      redirect: false,
      onMutationSuccess: (data) => {
        let id: number;
        if (Array.isArray(data?.data) && data?.data.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          id = data.data[0].id ?? 0;
        } else {
          id = data?.data?.id ?? 0;
        }
        dispatch({ type: "setWorkExperienceId", payload: id });
      },
      errorNotification: (data: any) => {
        const responseData = (data as IMessages).response.data;
        return getErrorMessageNotification({ responseData, errorMessages, defaultMessage: "ຕ້ອງສ້າງຂໍ້ມຸນການສະໝັກກ່ອນ" });
      },
    },
    warnWhenUnsavedChanges: true,
  });
  useUpdateDefaultValues(form as any, applicationId);
  return { form, state };
};

export const WorkExperienceSchema = z.object({
  experience: z
    .array(
      z.object({
        company: z.string().min(1, {
          message: "ກະລຸນາປ້ອນຊື່ບໍລິສັດ",
        }),
        position: z.string().min(1, {
          message: "ກະລຸນາປ້ອນຕໍາແໜ່ງ",
        }),
        time: z.string().min(1, {
          message: "ກະລຸນາລາຍະເວລາທີເຮັດວຽກ",
        }),
        salary: z.string().min(1, {
          message: "ກະລຸນາປ້ອນເງິນເດືອນ",
        }).transform((val) => Number(val.replace(/,/g, ""))),
        reasonOfResignation: z.string().min(1, {
          message: "ກະລຸນາອະທິບາຍໜ້າວຽກທີໄດ້ເຮັດຜ່ານມາ",
        }),
        applicationId: z.number(),
      }),
    ),
}).transform((val) => {
  const workExperienceList = val.experience;
  return workExperienceList;
});

const useUpdateDefaultValues = (form: IFormConfig & { setValue?: UseFormSetValue<any> } | undefined, applicationId: number) => {
  const applicationIdRef = useRef(applicationId);
  useEffect(() => {
    if (form && applicationIdRef.current !== applicationId && form.setValue) {
      form.setValue("experience[0].applicationId", applicationId);
      applicationIdRef.current = applicationId;
    }
  }, [form, applicationId]);
};

const errorMessages: ErrorMapMessage[] = [
  { val: "Invalid pk \"0\" - object does not exist.", message: "ຕ້ອງສ້າງຂໍ້ມຸນຂໍ້ມູນສ່ວນບຸກຄົນກ່ອນ" },
];
