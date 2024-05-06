import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type IMessages } from "@src/common/interface";
import { getErrorMessageNotification } from "@src/common/lib/errorNotification";
import { errorMessages, userSchema, userSchemaEdit } from "../userSchema";
import { useRouter } from "next/navigation";
export const useUserForm = (profile: number, navigates: string) => {
  const idEdit = profile <= 0;
  const router = useRouter();
  const form = useForm<{ id: number }>({
    resolver: zodResolver(idEdit ? userSchemaEdit : userSchema),
    defaultValues: { username: "", isActive: true, password: "", confirmPassword: "", groups: "" },
    refineCoreProps: {
      resource: "user",
      redirect: false,
      onMutationSuccess: (data) => {
        if (navigates === "profile") {
          const userID = data.data.id;
          router.push(`/profile/create/${userID}`);
        } else {
          router.back();
        }
      },
      errorNotification: (data: any) => {
        const responseData = (data as IMessages)?.response?.data;
        return getErrorMessageNotification({ responseData, errorMessages, defaultMessage: "ບໍ່ສາມາດສ້າງບັນຊີໃໝ່ໄດ້" });
      },
      successNotification: () => {
        return { message: "User account created successfully", type: "success", description: "" };
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};

