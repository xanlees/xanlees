import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import type * as z from "zod";
import { employeeSchema } from "./validation";
import { useNavigation } from "@refinedev/core";

export const useFormConfig = (redirect: RedirectAction) => {
  const { list } = useNavigation();
  const { ...form } = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    refineCoreProps: {
      autoSave: {
        enabled: true,
      },
      resource: "employee",
      onMutationSuccess: () => {
        console.log("enter");
        list("profile");
      },
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
