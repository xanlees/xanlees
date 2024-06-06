import * as z from "zod";
import { type ProfileSendData } from "../../interface/model";
import { validateCaptcha } from "react-simple-captcha";
import { validateImageSchema } from "@src/common/lib/validation/validationFormUtils";

const minPhoneNumberLength = 7;

const userInfoSchema = z.object({
  fullname: z.string().min(1, { message: "ກະລຸນາໃສ່ຊື່ແທ້ ແລະ ນາມສະກຸນ" }),
  type: z.string(),
  nickname: z.nullable(z.string()),
  phoneNumber: z
    .string()
    .min(minPhoneNumberLength, { message: "ກະລຸນາໃສ່ເບີໂທ" })
    .regex(/^(20\d{8})$/, { message: "ກະລຸນາປ້ອນເບີໂທ ໂດຍຮູບແບບທີ່ຖືກຕ້ອງ (20XXXXXXXX)" }),
  gender: z.string().min(1, { message: "ກະລຸນາເລືອກເພດ" }),
  maritalStatus: z.string().min(1, { message: "ກະລຸນາເລືອກສະຖານະພາບ" }),
  typeOfUniqueNumber: z.string().min(1, {
    message: "ກະລຸນາເລືອກປະເພດເລກລະຫັດວ່າ ເລກບັດປະຈໍາຕົວ, ເລກເຄື່ອງຂາຍເລກ ຫຼື ປື້ມສໍາມະໂມຄົວເລກທີ",
  }),
  birthday: z.date().or(z.string()).refine((value) => value != null && value !== "", {
    message: "ກະລຸນາເລືອກວັນ​ເດືອນ​ປີ​ເກີດ",
  }),
});

const uniqueNumberSchema = z.array(z.object({ uniqueNumber: z.string() }));

const profilePictureSchema = (isRequireImage: boolean) => validateImageSchema({
  required: isRequireImage,
  message: "ກະລຸນາເລືອກຮູບພາບ",
});

const captchaSchema = z.string().min(1).refine((value) => validateCaptcha(value, false), {
  message: "ລະຫັດ Captcha ບໍ່ຖືກ",
});

export const profileSchema = ({ isRequireImage = true }) => {
  return z
    .object({
      ...userInfoSchema.shape,
      uniqueNumber: uniqueNumberSchema,
      profilePicture: profilePictureSchema(isRequireImage),
      captcha: captchaSchema,
    })
    .transform((val) => transformUniqueNumber(val));
};

function transformUniqueNumber(val: ProfileSendData): Record<string, any> {
  const { uniqueNumber, birthday, ...rest } = val;
  const transformed: Record<string, any> = {
    ...rest,
    birthday: birthday instanceof Date ? birthday.toISOString() : birthday,
  };
  uniqueNumber.forEach((item, index) => {
    transformed[`uniqueNumber[${index}]`] = item.uniqueNumber;
  });
  if (transformed.profilePicture === undefined) {
    delete transformed.profilePicture;
  }
  return transformed;
}
