import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import type * as z from "zod";
import { employeeSchema } from "./validation";
import { useNavigation } from "@refinedev/core";

export const useFormConfig = (type?: string) => {
  const redirect = type === "LOTTERY" ? "agent" : "profile";
  const { list } = useNavigation();
  const { ...form } = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    refineCoreProps: {
      resource: "employee",
      onMutationSuccess: () => {
        list(redirect);
      },
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
