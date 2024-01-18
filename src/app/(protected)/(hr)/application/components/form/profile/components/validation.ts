import * as z from "zod";
const typeUniqueNumber = ["IDENTIFY", "CENSUS_BOOK"] as const;
const validGenders = ["MALE", "FEMALE", "OTHER"] as const;
export const validMaritalStatus = ["SINGLE", "MARRIED"] as const;
export const acceptedImageTypes = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];
export const maxFileSize = 5000000;

export const profileSchema = z
  .object({
    fullname: z.string().min(1, {
      message: "Full name must be at least 1 character.",
    }),
    nickname: z.string().min(1, {
      message: "Nickname must be at least 1 character.",
    }),
    phoneNumber: z.string().min(1, {
      message: "Phone number must be at least 1 character.",
    }),
    gender: z
      .enum(validGenders)
      .refine((value) => validGenders.includes(value), {
        message: "Gender must be one of 'MALE', 'FEMALE', or 'OTHER'.",
      }),
    typeOfUniqueNumber: z
      .enum(typeUniqueNumber)
      .refine((value) => typeUniqueNumber.includes(value), {
        message: "Gender must be one of 'MACHINE', 'CENSUS_BOOK'.",
      }),
    birthday: z.date().transform((value) => new Date(value).toISOString()),
    personalAddressId: z.number().min(0, {
      message: "Personal Address ID must be a non-negative number.",
    }),
    uniqueNumber: z.string(),
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
  })
  .transform((val) => {
    const sendData = {
      ...val,
      uniqueNumber: [val.uniqueNumber],
    };
    console.log("sendData", sendData);
    return sendData;
  });
