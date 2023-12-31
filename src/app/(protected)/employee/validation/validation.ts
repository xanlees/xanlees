/* eslint-disable no-magic-numbers */
/* eslint-disable max-lines */
import * as z from "zod";
const validGenders = ["MALE", "FEMALE", "OTHER"] as const;
const validMaritalStatus = [
  "SINGLE",
  "MARRIED",
  "DIVORCED",
  "WIDOWED",
] as const;

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
  birthday: z.date(),
  personalAddressId: z.number().min(0, {
    message: "Personal Address ID must be a non-negative number.",
  }),
  profilePicture: z.string().refine(
    (value) => {
      const isImageUrl = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(value);
      const isBase64Image = /^data:image\/(png|jpeg|jpg|gif);base64,/i.test(
        value,
      );
      console.log("value", value);
      const isValidFormat = /\.(jpg|jpeg|png|gif)$/i.test(value);
      const maxFileSize = 1 * 500 * 500;
      const isSizeValid = value.length <= maxFileSize;
      if (!((isImageUrl || isBase64Image) && isValidFormat && isSizeValid)) {
        if (!isImageUrl && !isBase64Image) {
          return { message: "Invalid image URL or base64 encoding." };
        }
        if (!isValidFormat) {
          return { message: "Invalid image format. Choose JPG, PNG, or GIF." };
        }
        if (!isSizeValid) {
          return { message: "Image size exceeds the maximum limit of 2MB." };
        }
      }
      return true;
    },
    {
      message:
        "Choose a valid photo (max size 2MB) in JPG, PNG, or GIF format.",
    },
  ),
  maritalStatus: z
    .enum(validMaritalStatus)
    .refine((value) => validMaritalStatus.includes(value), {
      message:
        "Marital status must be one of 'SINGLE', 'MARRIED', 'DIVORCED', or 'WIDOWED'.",
    }),
});

export const personalAddressSchema = z.object({
  bornDistrictId: z.number().min(0, {
    message: "Born District ID must be a non-negative number.",
  }),
  currentDistrictId: z.number().min(0, {
    message: "Current District ID must be a non-negative number.",
  }),
  bornVillage: z.string().min(1, {
    message: "Born Village must be at least 1 character.",
  }),
  currentVillage: z.string().min(1, {
    message: "Current Village must be at least 1 character.",
  }),
});

export const graduationSchema = z.object({
  degree: z.string().min(1, {
    message: "Degree must be at least 1 character.",
  }),
  sector: z.string().min(1, {
    message: "Sector must be at least 1 character.",
  }),
});

export const educationSchema = z.object({
  profileId: z.number().min(0, {
    message: "Profile ID must be a non-negative number.",
  }),
  graduationId: z.number().min(0, {
    message: "Graduation ID must be a non-negative number.",
  }),
  branch: z.string().min(1, {
    message: "Branch must be at least 1 character.",
  }),
  sector: z.string().min(1, {
    message: "Sector must be at least 1 character.",
  }),
  year: z.string().refine(
    (value) => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    },
    {
      message: "Invalid year format. It should be a valid date string.",
    },
  ),
});

export const employeeSchema = z.object({
  positionId: z.number().min(1, {
    message: "positionId ID must be a non-negative number.",
  }),
  joiningDate: z.string().min(1, {
    message: "joiningDate must be a non-empty string.",
  }),
  isLatest: z.string().min(1, {
    message: "isLatest must be a non-empty string.",
  }),
  profileId: z.number().min(1, {
    message: "profileId must be a non-negative number.",
  }),
});
