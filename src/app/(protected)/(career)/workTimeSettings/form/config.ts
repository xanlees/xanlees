import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import * as z from "zod";

export const useFormConfig = () => {
  const { ...form } = useForm<z.infer<typeof sectorSchema>>({
    resolver: zodResolver(sectorSchema),
    defaultValues: {
      branchId: 0,
      name: "",
    },
    refineCoreProps: {
      resource: "sector",
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};

export const sectorSchema = z.object({
  branchId: z.number().min(1, {
    message: "branchId  ID must be a valid positive number.",
  }),
  name: z.string().min(2, {
    message: "Sector Detail Name must be at least 2 characters.",
  }),
});
