import * as z from "zod";

const typeUniqueNumber = ["MACHINE", "IDENTIFY", "CENSUS_BOOK"] as const;
const validGenders = ["MALE", "FEMALE", "OTHER"] as const;
export const validMaritalStatus = ["SINGLE", "MARRIED"] as const;
export const acceptedImageTypes = [
  "image/jpg",
  "image/jpeg",
  "image/png",
];
export const maxFileSize = 10000000;

export const profileSchema = z
  .object({
    fullname: z.string().min(1, {
      message: "ກະລຸນາໃສ່ຊື່ແທ້ ແລະ ນາມສະກຸນ",
    }),
    nickname: z.string().min(1, {
      message: "ກະລຸນາໃສ່ຫຼີ້ນ",
    }),
    phoneNumber: z.string().min(1, {
      message: "ກະລຸນາໃສ່ເບີໂທ",
    }),
    gender: z
      .enum(validGenders)
      .refine((value) => validGenders.includes(value), {
        message: "ກະລຸນາເລືອກເພດ",
      }),
    typeOfUniqueNumber: z
      .enum(typeUniqueNumber)
      .refine((value) => typeUniqueNumber.includes(value), {
        message: "ກະລຸນາເລືອກປະເພດເລກລະຫັດວ່າ ເລກບັດປະຈໍາຕົວ, ເລກເຄື່ອງຂາຍເລກ ຫຼື ປື້ມສໍາມະໂມຄົວເລກທີ",
      }),
    birthday: z.date().transform((value) => new Date(value).toISOString()),
    personalAddressId: z.number().min(0, {
      message: "Personal Address ID must be a non-negative number.",
    }),
    uniqueNumber: z.array(
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
          "ຂະໜາດຮູບບໍ່ເກີນ 10MB. ແລະ ປະເພດຮູບ .jpg, .jpeg, .png",
      },
    ).nullable(),
    maritalStatus: z
      .enum(validMaritalStatus)
      .refine((value) => validMaritalStatus.includes(value), {
        message: "Marital status must be one of 'SINGLE', 'MARRIED'.",
      }),
  })
  .transform((val) => {
    const profileVal = transformUniqueNumber(val);
    delete profileVal.uniqueNumber;
    return profileVal;
  });

function transformUniqueNumber(val: ProfileSendData): Record<string, any> {
  return {
    ...val,
    ...val.uniqueNumber.reduce<Record<string, string>>((acc, curr, index) => {
      acc[`uniqueNumber[${index}]`] = curr.uniqueNumber;
      return acc;
    }, {}),
  };
}
