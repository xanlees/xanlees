import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getErrorMessageNotification } from "@src/common/lib/errorNotification";
import { useProfileContext } from "../../..";
import * as z from "zod";
import { type ProfileSendData } from "../../interface/model";
import { FormMultipart, type IMessages, type ErrorMapMessage } from "@src/common/interface";
const defaultMessage = "ບໍ່ສາມາດສ້າງຂໍ້ມູນສ່ວນບຸຄົນໄດ້";

export const useProfileForm = (type: string) => {
  const { state, dispatch } = useProfileContext();
  const { ...form } = useForm<{ id?: number }>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullname: "",
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
      successNotification: false,
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

const typeUniqueNumber = ["MACHINE", "IDENTIFY", "CENSUS_BOOK"] as const;
const validGenders = ["MALE", "FEMALE", "OTHER"] as const;
const validMaritalStatus = ["SINGLE", "MARRIED"] as const;
const acceptedImageTypes = [
  "image/jpg",
  "image/jpeg",
  "image/png",
];
const maxFileSize = 10000000;

export const profileSchema: any = z
  .object({
    fullname: z.string().min(1, { message: "ກະລຸນາໃສ່ຊື່ແທ້ ແລະ ນາມສະກຸນ" }),
    type: z.string(),
    nickname: z.string().min(1, { message: "ກະລຸນາໃສ່ຫຼີ້ນ" }),
    phoneNumber: z.string().min(1, { message: "ກະລຸນາໃສ່ເບີໂທ" }),
    gender: z.enum(validGenders).refine((value) => validGenders.includes(value), { message: "ກະລຸນາເລືອກເພດ" }),
    typeOfUniqueNumber: z
      .enum(typeUniqueNumber)
      .refine((value) => typeUniqueNumber.includes(value), {
        message: "ກະລຸນາເລືອກປະເພດເລກລະຫັດວ່າ ເລກບັດປະຈໍາຕົວ, ເລກເຄື່ອງຂາຍເລກ ຫຼື ປື້ມສໍາມະໂມຄົວເລກທີ",
      }),
    birthday: z.date().transform((value) => new Date(value).toISOString()),
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
    maritalStatus: z
      .enum(validMaritalStatus)
      .refine((value) => validMaritalStatus.includes(value), {
        message: "Marital status must be one of 'SINGLE', 'MARRIED'.",
      }),
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

