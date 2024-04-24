import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import * as z from "zod";

export const useFormConfig = () => {
  const { ...form } = useForm<z.infer<typeof sectorSchema>>({
    resolver: zodResolver(sectorSchema),
    defaultValues: {
      branchId: 0,
      name: "",
      type: "",
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
    message: "ກະລຸນາເລືອກທີຕັ້ງຫ້ອງການ",
  }),
  name: z.string().min(2, {
    message: "ກະລຸນາປ້ອນຊື່ພະແນກ",
  }),
  type: z.string().min(2, {
    message: "ກະລຸນາເລືອກປະເພດ",
  }),
});
