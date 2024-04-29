import * as z from "zod";
import { type ProfileSendData } from "../../interface/model";
import { validateCaptcha } from "react-simple-captcha";

const acceptedImageTypes = [
  "image/jpg",
  "image/jpeg",
  "image/png",
];
const maxFileSize = 10000000;
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
    maritalStatus: z.string().min(1, { message: "ກະລຸນາເລືອກສະຖານະພາບ" }),
    typeOfUniqueNumber: z.string().min(1, { message: "ກະລຸນາເລືອກປະເພດເລກລະຫັດວ່າ ເລກບັດປະຈໍາຕົວ, ເລກເຄື່ອງຂາຍເລກ ຫຼື ປື້ມສໍາມະໂມຄົວເລກທີ" }),
    birthday: z.date().or(z.string()).refine((value) => { return value != null && value !== ""; }, { message: "ກະລຸນາເລືອກວັນ​ເດືອນ​ປີ​ເກີດ" }),
    uniqueNumber: z.array(z.object({ uniqueNumber: z.string() })),
    profilePicture: z.union([
      z.string(),
      z.instanceof(File).refine((file) => {
        return file.size <= maxFileSize && acceptedImageTypes.includes(file.type);
      }, {
        message: `The file size must not exceed 10MB and the file type must be one of the following: ${acceptedImageTypes.join(", ")}.`,
      }),
      z.undefined(),
    ]).nullable(),
    captcha: z.string().min(1).refine((value) => { return validateCaptcha(value); }, { message: "ລະຫັດ Captcha ບໍ່ຖືກ" }),
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
