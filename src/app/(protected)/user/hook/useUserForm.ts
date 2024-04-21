import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect, useState } from "react";
import * as z from "zod";
import { useCustomMutation } from "@refinedev/core";
import { type CreateUserProfileProps, type UserProfile } from "../interface/interface";

export const useUserForm = (profile: number) => {
  const [user, setUser] = useState<number>(0);
  const [shouldCreateProfile, setShouldCreateProfile] = useState(false);
  const form = useForm<{ id: number }>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      isActive: true,
      password: "",
      confirmPassword: "",
      groups: "",
    },
    refineCoreProps: {
      resource: "user",
      redirect: false,
      onMutationSuccess: (data) => {
        setUser(data.data.id ?? 0);
        setShouldCreateProfile(true);
      },
      successNotification: () => {
        return { message: "User account created successfully", type: "success", description: "" };
      },
    },
    warnWhenUnsavedChanges: true,
  });
  useCreateUserProfile({ user, profile, shouldCreateProfile, setShouldCreateProfile });
  return { form };
};

const userSchema = z
  .object({
    username: z.string().min(2, {
      message: "ກະລຸນາປ້ອນຢູເຊີ",
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
