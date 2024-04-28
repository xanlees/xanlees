import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  FormMultipart,
} from "@src/common/interface";

export const useProfileEditForm = () => {
  const { ...form } = useForm<{ id?: number }>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullname: "",
      nickname: "",
      phoneNumber: "",
      gender: "",
      birthday: "",
      type: "",
      maritalStatus: "",
      typeOfUniqueNumber: "IDENTIFY",
      profilePicture: undefined,
      uniqueNumber: [{
        uniqueNumber: "",
      }],
    },
    mode: "onChange",
    refineCoreProps: {
      resource: "profile",
      meta: FormMultipart,
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
const acceptedImageTypes = ["image/jpg", "image/jpeg", "image/png"];
const maxFileSize = 10000000;
const minPhoneNumberLength = 7;
export const profileSchema: any = z
  .object({
    fullname: z.string().min(1, { message: "ກະລຸນາໃສ່ຊື່ແທ້ ແລະ ນາມສະກຸນ" }),
    nickname: z.nullable(z.string()),
    phoneNumber: z.string().min(minPhoneNumberLength, { message: "ກະລຸນາໃສ່ເບີໂທ" }).regex(/^(20\d{8})$/, { message: "ກະລຸນາປ້ອນເບີໂທ ໂດຍຮູບແບບທີ່ຖືກຕ້ອງ (20XXXXXXXX)" }),
    gender: z.string().min(1, { message: "ກະລຸນາເລືອກເພດ" }),
    maritalStatus: z.string().min(1, { message: "ກະລຸນາເລືອກສະຖານະພາບ" }),
    typeOfUniqueNumber: z.string().min(1, { message: "ກະລຸນາເລືອກປະເພດເລກລະຫັດວ່າ ເລກບັດປະຈໍາຕົວ, ເລກເຄື່ອງຂາຍເລກ ຫຼື ປື້ມສໍາມະໂມຄົວເລກທີ" }),
    birthday: z.date().or(z.string()).refine((value) => { return value != null && value !== ""; }, { message: "ກະລຸນາເລືອກວັນ​ເດືອນ​ປີ​ເກີດ" }),
    uniqueNumber: z.union([z.string(), z.array(z.string())]).optional(),
    type: z.union([z.string(), z.array(z.string())]).optional(),
    profilePicture: z.union([
      z.string(),
      z.instanceof(File).refine((file) => {
        return file.size <= maxFileSize && acceptedImageTypes.includes(file.type);
      }, { message: `The file size must not exceed 10MB and the file type must be one of the following: ${acceptedImageTypes.join(", ")}.` }),
      z.undefined(),
    ]).nullable(),
  })
  .transform((val) => {
    return transformUniqueNumber(val);
  });

function transformUniqueNumber(val: ProfileSendData): Record<string, any> {
  let transformed: Record<string, any> = { ...val, profilePicture: val.profilePicture };
  if (Array.isArray(val.uniqueNumber)) {
    transformed = {
      ...transformed,
      // eslint-disable-next-line max-params
      uniqueNumber: val.uniqueNumber.reduce<Record<string, string>>((acc, curr, index) => {
        acc[`uniqueNumber[${index}]`] = curr;
        return acc;
      }, {}),
    };
  } else if (typeof val.uniqueNumber === "string") {
    transformed["uniqueNumber[0]"] = val.uniqueNumber;
  } else {
    transformed.uniqueNumber = [];
  }
  if (transformed.profilePicture === undefined) {
    delete transformed.profilePicture;
  }
  if (transformed.birthday instanceof Date) {
    transformed.birthday = transformed.birthday.toISOString();
  }
  if (typeof transformed.profilePicture === "string") {
    delete transformed.profilePicture;
  }
  delete transformed.uniqueNumber;
  return transformed;
}
interface ProfileSendData {
  fullname: string
  nickname: string | null
  phoneNumber: string
  gender: string
  birthday: string | Date
  uniqueNumber?: string | string[]
  typeOfUniqueNumber: string
  profilePicture?: string | File | null
  maritalStatus: string
}
