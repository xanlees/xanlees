import { documentFormSchema } from "./validation";
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { formHeadersConfig } from "@src/common/interface";
import { useProfileContext } from "../../../context";

const step = 3;
interface FormConfigParams {
  setCurrentStep: ((step: number) => void) | undefined
  dispatch: any
}

export const useFormConfig = ({ setCurrentStep, dispatch}: FormConfigParams) => {
  const { ...form } = useForm<z.infer<typeof documentFormSchema>>({
    resolver: zodResolver(documentFormSchema),
    refineCoreProps: {
      resource: "document",
      redirect: false,
      meta: formHeadersConfig,
      onMutationSuccess: (data) => {
        dispatch({ type: "setIsUploaded", payload: true });
        (setCurrentStep != null) && setCurrentStep(step);
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
