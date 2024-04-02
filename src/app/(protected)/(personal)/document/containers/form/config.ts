import { documentFormSchema } from "./validation";
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { FormMultipart } from "@src/common/interface";
import { useProfileContext } from "../../../context";

interface FormConfigParams {
  setCurrentStep: ((step: number) => void) | undefined
}
const step = 4;
export const useFormConfig = ({ setCurrentStep }: FormConfigParams) => {
  const { dispatch } = useProfileContext();
  const { ...form } = useForm<z.infer<typeof documentFormSchema>>({
    resolver: zodResolver(documentFormSchema),
    refineCoreProps: {
      resource: "document",
      redirect: false,
      meta: FormMultipart,
      onMutationSuccess: (data) => {
        dispatch({ type: "setIsUploaded", payload: true });
        (setCurrentStep != null) && setCurrentStep(step);
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
