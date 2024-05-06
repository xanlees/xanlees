import { useCustomMutation } from "@refinedev/core";
import { useEffect, useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type CreateUserProfileProps, type UserProfile } from "../interface/interface";
import { type IMessages } from "@src/common/interface";
import { getErrorMessageNotification } from "@src/common/lib/errorNotification";
import { errorMessages, userSchema, userSchemaEdit } from "../userSchema";
import { useRouter } from "next/navigation";
export const useUserForm = ({ redirect, id, navigates }: { redirect: string, id: number, navigates: string }) => {
  const idEdit = id <= 0 && redirect === "user";
  const router = useRouter();
  const [user, setUser] = useState<number>(0);
  const [shouldCreateProfile, setShouldCreateProfile] = useState(false);
  const form = useForm<{ id: number }>({
    resolver: zodResolver(idEdit ? userSchemaEdit : userSchema),
    defaultValues: { username: "", isActive: true, password: "", confirmPassword: "", groups: "" },
    refineCoreProps: {
      resource: "user",
      redirect: false,
      onMutationSuccess: (data) => {
        if (redirect === "profile") {
          setUser(data.data.id ?? 0);
          router.push(`/profile/create/${data.data.id}`);
        }
        setShouldCreateProfile(true);
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
  if (navigates === "profile" && id > 0) {
    useCreateUserProfile({ user, id, shouldCreateProfile, setShouldCreateProfile });
  }
  return { form };
};

const useCreateUserProfile = ({ user, id, shouldCreateProfile, setShouldCreateProfile }: CreateUserProfileProps) => {
  const { mutate } = useCustomMutation<UserProfile>();
  useEffect(() => {
    if (user && shouldCreateProfile) {
      mutate({
        url: "profile/user-profile",
        method: "post",
        values: {
          user,
          profile: id,
        },
      });
      setShouldCreateProfile(false);
    }
  }, [mutate, user, id, shouldCreateProfile, setShouldCreateProfile]);
};
