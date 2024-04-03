import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { graduationSchema } from "./validation";
import { useProfileContext } from "../../../context";

interface IEducationFromValue {
  id: number
}
export const useFormConfig = () => {
  const { dispatch } = useProfileContext();
  const { ...form } = useForm<IEducationFromValue>({
    resolver: zodResolver(graduationSchema),
    refineCoreProps: {
      resource: "education",
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
        dispatch({ type: "setEducationId", payload: id });
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
