import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getErrorMessageNotification } from "@src/common/lib/errorNotification";
import { useProfileContext } from "../..";
import * as z from "zod";
import { type ProfileSendData } from "../interface/model";
import { FormMultipart, type IMessages, type ErrorMapMessage } from "@src/common/interface";
const defaultMessage = "ບໍ່ສາມາດສ້າງຂໍ້ມູນສ່ວນບຸຄົນໄດ້";

export const useProfileForm = (type: string) => {
  const { state, dispatch } = useProfileContext();
  const { ...form } = useForm<{ id?: number }>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullname: "",
      nickname: "",
      phoneNumber: "",
      gender: "",
      birthday: "",
      maritalStatus: "",
      typeOfUniqueNumber: "IDENTIFY",
      uniqueNumber: [{ uniqueNumber: undefined }],
      type,
    },
    mode: "onChange",
    refineCoreProps: {
      resource: "profile",
      meta: FormMultipart,
      onMutationSuccess: (data) => {
        dispatch({ type: "setProfileId", payload: data?.data?.id ?? 0 });
      },
      errorNotification: (data: any) => {
        const responseData = (data as IMessages).response.data;
        return getErrorMessageNotification({ responseData, errorMessages, defaultMessage });
      },
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form, state };
};
const errorMessages: ErrorMapMessage[] = [
  { val: "Profile with this fullname already exists.", message: "ຊື່ຂອງທ່ານມີໃນລະບົບແລ້ວ" },
  { val: "Profile with this phone number already exists.", message: "ເບີໂທນີ້ມີໃນລະບົບແລ້ວ" },
];

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
    profilePicture: (z.any() as z.ZodType<FileList>).refine(
      (fileList) => {
        const file = fileList?.[0];
        return (
          file?.size <= maxFileSize && acceptedImageTypes.includes(file?.type)
        );
      },
      { message: "ຂະໜາດຮູບບໍ່ເກີນ 10MB. ແລະ ປະເພດຮູບ .jpg, .jpeg, .png" },
    ).nullable(),
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
  console.log("transformed", transformed);
  return transformed;
}
