/* eslint-disable max-params */
import * as z from "zod";
import type { ProfileSendData } from "../interface";
import { maxFileSize, acceptedImageTypes } from "../lib/imageTypes";

const validGenders = ["MALE", "FEMALE", "OTHER"] as const;
export const validMaritalStatus = ["SINGLE", "MARRIED"] as const;

export const profileSchema = z.object({
  fullname: z.string().min(1, {
    message: "Full name must be at least 1 character.",
  }),
  nickname: z.string().min(1, {
    message: "Nickname must be at least 1 character.",
  }),
  phoneNumber: z.string().min(1, {
    message: "Phone number must be at least 1 character.",
  }),
  gender: z.enum(validGenders).refine((value) => validGenders.includes(value), {
    message: "Gender must be one of 'MALE', 'FEMALE', or 'OTHER'.",
  }),
  birthday: z.date().transform((value) => new Date(value).toISOString()),
  personalAddressId: z.number().min(0, {
    message: "Personal Address ID must be a non-negative number.",
  }),
  uniqueNumber: z
    .array(
      z.object({
        uniqueNumber: z.string(),
      }),
    ),
  profilePicture: (z.any() as z.ZodType<FileList>).refine(
    (fileList) => {
      const file = fileList?.[0];
      return (
        file?.size <= maxFileSize && acceptedImageTypes.includes(file?.type)
      );
    },
    {
      message:
        "Max image size is 5MB. Only .jpg, .jpeg, .png, and .webp formats are supported.",
    },
  ),
  maritalStatus: z
    .enum(validMaritalStatus)
    .refine((value) => validMaritalStatus.includes(value), {
      message: "Marital status must be one of 'SINGLE', 'MARRIED'.",
    }),
}).transform((val) => {
  const profileVal = transformUniqueNumber(val);
  delete profileVal.uniqueNumber;
  return profileVal;
});

function transformUniqueNumber(val: ProfileSendData): Record<string, any> {
  return {
    ...val,
    ...(val.uniqueNumber.reduce<Record<string, string>>((acc, curr, index) => {
      acc[`uniqueNumber[${index}]`] = curr.uniqueNumber;
      return acc;
    }, {})),
  };
}
