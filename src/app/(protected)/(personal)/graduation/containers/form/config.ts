import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import type * as z from "zod";
import { graduationSchema } from "./validation";
import { getErrorMessageNotification } from "@src/common/lib/errorNotification";
import { type ErrorMapMessage, type IMessages } from "@src/common/interface";

export const useFormConfig = () => {
  const { ...form } = useForm<z.infer<typeof graduationSchema>>({
    resolver: zodResolver(graduationSchema),
    refineCoreProps: {
      resource: "graduation",
      errorNotification: (data: any) => {
        const responseData = (data as IMessages).response.data;
        return getErrorMessageNotification({ responseData, errorMessages, defaultMessage: "ບໍ່ສາມາດສ້າງໄດ້" });
      },
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};

const errorMessages: ErrorMapMessage[] = [
  { val: "The fields degree, sector must make a unique set.", message: "ພາກວິຊານີ້ມີແລ້ວ" },
];
