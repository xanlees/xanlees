import * as z from "zod";
const validGenders = ["MALE", "FEMALE", "OTHER"] as const;
const validMaritalStatus = [
  "SINGLE",
  "MARRIED",
] as const;
const maxFileSize = 5000000;
const acceptedImageTypes = ["image/jpg", "image/jpeg", "image/png", "image/webp"];

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
  birthday: z.date().transform((value) => (new Date(value)).toISOString()),
  personalAddressId: z.number().min(0, {
    message: "Personal Address ID must be a non-negative number.",
  }),
  profilePicture: z
    .instanceof(FileList)
    .refine((fileList) => {
      const file = fileList[0];
      return file?.size <= maxFileSize && acceptedImageTypes.includes(file?.type);
    }, "Max image size is 5MB. Only .jpg, .jpeg, .png and .webp formats are supported."),
  maritalStatus: z
    .enum(validMaritalStatus)
    .refine((value) => validMaritalStatus.includes(value), {
      message:
        "Marital status must be one of 'SINGLE', 'MARRIED'.",
    }),
});
