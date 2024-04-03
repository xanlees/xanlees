import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import type * as z from "zod";
import { branchSchema, positionSchema } from "../validation";

export const useFormBranchConfig = () => {
  const { ...form } = useForm<z.infer<typeof branchSchema>>({
    resolver: zodResolver(branchSchema),
    refineCoreProps: {
      resource: "branch",
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};

export const useFormPositionConfig = (redirect: RedirectAction) => {
  const { ...form } = useForm<z.infer<typeof positionSchema>>({
    resolver: zodResolver(positionSchema),
    refineCoreProps: {
      resource: "position",
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
