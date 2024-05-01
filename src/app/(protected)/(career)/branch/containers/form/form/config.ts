import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import * as z from "zod";
import { type IMessages, type ErrorMapMessage } from "@src/common/interface";
import { getErrorMessageNotification } from "@src/common/lib/errorNotification";

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
      errorNotification: (data: any) => {
        const responseData = (data as IMessages).response.data;
        return getErrorMessageNotification({ responseData, errorMessages, defaultMessage: "" });
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};

export const branchSchema = z.object({
  name: z.string().min(2, {
    message: "ກະລຸໃສຊື່ສາຂາ",
  }),
  type: z.string().min(1, {
    message: "ກະລຸເລືອກປະເພດຫ້ອງການ",
  }),
});

export const useFormPositionConfig = (branchType: string) => {
  const redirect = branchType === "LOTTERY" ? "lottery-branch" : "branch";
  const { list } = useNavigation();
  const { ...form } = useForm<z.infer<typeof positionSchema>>({
    resolver: zodResolver(positionSchema),
    defaultValues: {
      name: "",
      sectorId: 0,
    },
    refineCoreProps: {
      resource: "position",
      redirect: false,
      onMutationSuccess: () => {
        list(redirect);
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};

export const positionSchema = z.object({
  name: z.string().min(2, {
    message: "ກະລຸໃສ່ຊື້ສາຂາຕໍາແໜງ",
  }),
  sectorId: z.number().min(1, {
    message: "ກະລຸເລືອກ",
  }),
});

const errorMessages: ErrorMapMessage[] = [
  { val: "The fields name, type must make a unique set.", message: "ທີຕັ້ງຫ້ອງການຢູ່ແຂວງ ແລະ ປເພດຫ້ອງມີແລ້ວ" },
];
