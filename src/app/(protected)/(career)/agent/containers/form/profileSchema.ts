import * as z from "zod";

const validGenders = ["MALE", "FEMALE"] as const;
const acceptedImageTypes = [
  "image/jpg",
  "image/jpeg",
  "image/png",
];
const maxFileSize = 10000000;

interface ProfileSendData {
  fullname: string
  nickname?: string
  phoneNumber: string
  gender: "MALE" | "FEMALE"
  uniqueNumber: Array<{
    uniqueNumber: string
  }>
  profilePicture?: FileList | null
}

export const profileSchema = z
  .object({
    fullname: z.string().min(1, { message: "ກະລຸນາໃສ່ຊື່ແທ້ ແລະ ນາມສະກຸນ" }),
    type: z.string().default("AGENT"),
    nickname: z.string().optional(),
    phoneNumber: z.string().min(1, { message: "ກະລຸນາໃສ່ເບີໂທ" }),
    gender: z
      .enum(validGenders)
      .refine((value) => validGenders.includes(value), {
        message: "ກະລຸນາເລືອກເພດ",
      }),
    typeOfUniqueNumber: z.string().default("MACHINE"),
    uniqueNumber: z.array(
      z.object({
        uniqueNumber: z.string(),
      }),
    ),
    profilePicture: z.union([z.any(), z.null()]).refine((fileList: FileList | null) => {
      if (fileList == null) {
        return true;
      }
      const file = fileList[0];
      return file?.size <= maxFileSize && acceptedImageTypes.includes(file?.type);
    }, { message: "ຂະໜາດຮູບບໍ່ເກີນ 10MB. ແລະ ປະເພດຮູບ .jpg, .jpeg, .png" }),
  })
  .transform((val) => {
    return transformUniqueNumber(val);
  });

function transformUniqueNumber(val: ProfileSendData): Record<string, any> {
  const transformed: Record<string, any> = {
    ...val,
    profilePicture: val.profilePicture,
  };
  val.uniqueNumber.forEach((item, index) => {
    transformed[`uniqueNumber[${index}]`] = item.uniqueNumber;
  });
  if (transformed.profilePicture === undefined) {
    delete transformed.profilePicture;
  }
  delete transformed.uniqueNumber;
  return transformed;
}

