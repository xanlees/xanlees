/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-lines-per-function */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { WorkExperienceSchema } from "./validation";
import { useApplicationContext } from "../../../application/context";

interface FormConfigParams {
  setCurrentStep: ((step: number) => void) | undefined
}
interface WorkExperienceData {
  id: number
}

interface WorkExperienceProps {
  id: number
  data: WorkExperienceData[]
}

const step = 8;
export const useFormConfig = ({ setCurrentStep }: FormConfigParams) => {
  const { state, dispatch } = useApplicationContext();
  const { ...form } = useForm<WorkExperienceProps>({
    resolver: zodResolver(WorkExperienceSchema),
    defaultValues: {
      work_experience: [
        {
          id: 3,
          company: "",
          position: "",
          time: "",
          salary: "",
          reasonOfResignation: undefined,
        },
      ],
    },
    refineCoreProps: {
      resource: "work_experience",
      autoSave: {
        enabled: true,
      },
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
        (setCurrentStep != null) && setCurrentStep(step);
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form, state };
};
