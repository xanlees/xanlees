import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import type * as z from "zod";
import { sectorSchema } from "./validation";

export const useFormConfig = (redirect: RedirectAction) => {
  const { ...form } = useForm<z.infer<typeof sectorSchema>>({
    resolver: zodResolver(sectorSchema),
    refineCoreProps: {
      resource: "sector",
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
