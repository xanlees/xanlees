import * as z from "zod";
const acceptedImageTypes = [
  "image/jpg",
  "image/jpeg",
  "image/png",
];
const maxFileSize = 10000000;

interface ProfileSendData {
  fullname: string
  nickname: string | null
  phoneNumber: string
  gender: string
  uniqueNumber: Array<{
    uniqueNumber: string
  }>
  profilePicture?: string | File | null
}
const minPhoneNumberLength = 7;

export const profileSchema: any = z
  .object({
    fullname: z.string().min(1, { message: "ກະລຸນາໃສ່ຊື່ແທ້ ແລະ ນາມສະກຸນ" }),
    type: z.string(),
    nickname: z.nullable(z.string()),
    phoneNumber: z.string()
      .min(minPhoneNumberLength, { message: "ກະລຸນາໃສ່ເບີໂທ" })
      .regex(/^(20\d{8})$/, { message: "ກະລຸນາປ້ອນເບີໂທ ໂດຍຮູບແບບທີ່ຖືກຕ້ອງ (20XXXXXXXX)" }),
    gender: z.string().min(1, { message: "ກະລຸນາເລືອກເພດ" }),
    typeOfUniqueNumber: z.string(),
    uniqueNumber: z.array(z.object({ uniqueNumber: z.string() })),
    profilePicture: z.union([
      z.string(),
      z.instanceof(File).refine((file) => {
        return file.size <= maxFileSize && acceptedImageTypes.includes(file.type);
      }, {
        message: `ຂະໜາດຮູບບໍ່ເກີນ 10MB. ແລະ ປະເພດຮູບ .jpg, .jpeg, .png: ${acceptedImageTypes.join(", ")}.`,
      }),
      z.undefined(),
    ]).nullable(),
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
  if (transformed.birthday instanceof Date) {
    transformed.birthday = transformed.birthday.toISOString();
  }
  delete transformed.uniqueNumber;
  return transformed;
}
