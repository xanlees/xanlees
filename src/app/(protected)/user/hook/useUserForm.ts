/* eslint-disable max-lines */
import * as z from "zod";
import { useCustomMutation, useNavigation } from "@refinedev/core";
import { useEffect, useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type CreateUserProfileProps, type UserProfile } from "../interface/interface";
import { type IMessages, type ErrorMapMessage } from "@src/common/interface";
import { getErrorMessageNotification } from "@src/common/lib/errorNotification";

export const useUserForm = (profile: number, navigates: string) => {
  const idEdit = profile <= 0;
  const { list } = useNavigation();
  const [user, setUser] = useState<number>(0);
  const [shouldCreateProfile, setShouldCreateProfile] = useState(false);
  const form = useForm<{ id: number }>({
    resolver: zodResolver(idEdit ? userSchemaEdit : userSchema),
    defaultValues: { username: "", isActive: true, password: "", confirmPassword: "", groups: "" },
    refineCoreProps: {
      resource: "user",
      redirect: false,
      onMutationSuccess: (data) => {
        if (navigates === "profile") {
          setUser(data.data.id ?? 0);
        }
        setShouldCreateProfile(true);
        list(navigates);
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
  if (navigates === "profile") {
    useCreateUserProfile({ user, profile, shouldCreateProfile, setShouldCreateProfile });
  }
  return { form };
};

export const errorMessages: ErrorMapMessage[] = [
  {
    val: "A user with that username already exists.",
    message: "ຊື່ບັນຊີນີ້ມີໃນລະບົບແລ້ວ",
  },
  {
    val: "Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters.",
    message: "ຊື່ບັນສາມາດ ໃຊ້ໄດ້ແຕ່ຕົວໜັງສື່, ຕົວເລກ ແລະ @/./+/-/ ",
  },
];

const userSchema = z
  .object({
    username: z.string().min(2, {
      message: "ກະລຸນາປ້ອນບັນຊີ",
    }),
    password: z.string().refine(
      (value) => {
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numberRegex = /[0-9]/;
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        return (
          uppercaseRegex.test(value) && lowercaseRegex.test(value) && numberRegex.test(value) && specialCharRegex.test(value)
        );
      },
      { message: "ລະຫັດຜ່ານຕ້ອງໂຕນ້ອຍ, ໃຫຍ່, ໂຕເລກ ແລະ ອັກສອນພິເສດ" },
    ),
    confirmPassword: z.string().min(2, { message: "ກະລຸນາປ້ອນຢືນ​ຢັນລະຫັດຜ່ານ" }),
    isActive: z.boolean().optional(),
    groups: z.string().min(1, { message: "ກະລຸນາເລືອກສິດຂອງບັນຊີໃຊ້ງານລະບົບ" }),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "ລະຫັດຜ່ານ ແລະ ຢືນ​ຢັນລະຫັດຜ່ານບໍ່ກົງກັນ",
    path: ["confirmPassword"],
  })
  .transform((val) => {
    if (typeof val.groups === "string") {
      return { ...val, groups: [val.groups] };
    }
    return val;
  });

const useCreateUserProfile = ({ user, profile, shouldCreateProfile, setShouldCreateProfile }: CreateUserProfileProps) => {
  const { mutate } = useCustomMutation<UserProfile>();
  useEffect(() => {
    if (user && shouldCreateProfile) {
      mutate({
        url: "profile/user-profile",
        method: "post",
        values: {
          user,
          profile,
        },
      });
      setShouldCreateProfile(false);
    }
  }, [mutate, user, profile, shouldCreateProfile, setShouldCreateProfile]);
};

const userSchemaEdit = z.object({
  isActive: z.boolean().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  groups: z.union([z.array(z.string()), z.string()]),
}).refine((data) => {
  return (data.password === "" && data.confirmPassword === "") || (data.password === data.confirmPassword);
}, {
  message: "ເລກລະຫັດລະລັດຜ່ານບໍ່ກົງກັນ",
  path: ["confirmPassword"],
}).transform((data) => {
  const transformedVal = { ...data };
  if (typeof data.groups === "string") {
    transformedVal.groups = [data.groups];
  }
  if (!data.password && !data.confirmPassword) {
    delete transformedVal.password;
    delete transformedVal.confirmPassword;
  }
  return transformedVal;
});
