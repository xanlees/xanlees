import { type ErrorMapMessage } from "@src/common/interface";
import * as z from "zod";

export const userSchema = z
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

export const userSchemaEdit = z.object({
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

