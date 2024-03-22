import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import type * as z from "zod";
import { graduationSchema } from "./validation";

export const useFormConfig = () => {
  const { ...form } = useForm<z.infer<typeof graduationSchema>>({
    resolver: zodResolver(graduationSchema),
    refineCoreProps: {
      resource: "graduation",
      autoSave: {
        enabled: true,
      },
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
