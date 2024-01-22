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
      message: "ກະລຸນາປ້ອນຊື່ແທ້ ແລະນາມສະກຸນ",
    }),
    nickname: z.string().min(1, {
      message: "ກະລຸນາປ້ອນຊື່ຫຼີ້ນ",
    }),
    phoneNumber: z.string().min(1, {
      message: "ກະລຸນາປ້ອນເບີໂທ",
    }),
    gender: z
      .enum(validGenders)
      .refine((value) => validGenders.includes(value), {
        message: "ກະລຸນາເລືອກເພດ",
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
    profilePicture: (z.any() as z.ZodType<FileList>).refine((fileList) => {
      const file = fileList?.[0];
      return (
        file?.size <= maxFileSize && acceptedImageTypes.includes(file?.type)
      );
    }),
    maritalStatus: z
      .enum(validMaritalStatus)
      .refine((value) => validMaritalStatus.includes(value), {
        message: "ກະລຸນາເລືອກສະຖານາການແຕ່ງງານ",
      }),
  })
  .transform((val) => {
    const extractedText = "uniqueNumber";
    const { uniqueNumber, ...sendDataWithoutUniqueNumber } = {
      ...val,
      [`${extractedText}[0]`]: [val.uniqueNumber],
    };
    return sendDataWithoutUniqueNumber;
  });
