import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { useApplicationContext } from "../../../application/context";
import * as z from "zod";

interface WorkExperienceData {
  id: number
}

interface WorkExperienceProps {
  id: number
  data: WorkExperienceData[]
}

export const useFormConfig = () => {
  const { state, dispatch } = useApplicationContext();
  const { ...form } = useForm<WorkExperienceProps>({
    resolver: zodResolver(WorkExperienceSchema),
    defaultValues: {
      experience: [
        {
          id: 3,
          company: "",
          position: "",
          time: "",
          salary: "",
          reasonOfResignation: "",
        },
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
    },
    warnWhenUnsavedChanges: true,
  });
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
        reasonOfResignation: z.string().nullable(),
        applicationId: z.number(),
      }),
    ),
}).transform((val) => {
  const workExperienceList = val.experience;
  return workExperienceList;
});
