import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import * as z from "zod";

export const useFormBranchConfig = (type: string) => {
  const { ...form } = useForm<z.infer<typeof branchSchema>>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      type,
      name: "",
    },
    refineCoreProps: {
      resource: "branch",
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};

export const branchSchema = z.object({
  name: z.string().min(2, {
    message: "ກະລຸໃສຊື້ສາຂາ",
  }),
  type: z.string().min(2),
});

export const useFormPositionConfig = () => {
  const { ...form } = useForm<z.infer<typeof positionSchema>>({
    resolver: zodResolver(positionSchema),
    defaultValues: {
      name: "",
      sectorId: 0,
    },
    refineCoreProps: {
      resource: "position",
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};

export const positionSchema = z.object({
  name: z.string().min(2, {
    message: "ກະລຸໃສຊື້ສາຂາຕໍາແໜງ",
  }),
  sectorId: z.number().min(1, {
    message: "ກະລຸເລືອກ",
  }),
});
