import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  FormMultipart,
} from "@src/common/interface";
import { useRouter } from "next/navigation";

export const useProfileEditForm = ({ id }: { id: number }) => {
  const router = useRouter();
  const { ...form } = useForm<{ id?: number }>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullname: "",
      nickname: "",
      phoneNumber: "",
      gender: "",
      type: "",
      profilePicture: undefined,
      uniqueNumber: [
        { uniqueNumber: "" },
      ],
    },
    mode: "onChange",
    refineCoreProps: {
      resource: "profile",
      meta: FormMultipart,
      redirect: false,
      onMutationSuccess: () => { router.back(); },
      action: "edit",
      id,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};

const acceptedImageTypes = ["image/jpg", "image/jpeg", "image/png"];
const maxFileSize = 10000000;
const minPhoneNumberLength = 7;

export const profileSchema = z
  .object({
    type: z.string(),
    fullname: z.string().min(1, { message: "ກະລຸນາໃສ່ຊື່ແທ້ ແລະ ນາມສະກຸນ" }),
    nickname: z.nullable(z.string()),
    phoneNumber: z.string().min(minPhoneNumberLength, { message: "ກະລຸນາໃສ່ເບີໂທ" }).regex(/^(20\d{8})$/, { message: "ກະລຸນາປ້ອນເບີໂທ ໂດຍຮູບແບບທີ່ຖືກຕ້ອງ (20XXXXXXXX)" }),
    gender: z.string().min(1, { message: "ກະລຸນາເລືອກເພດ" }),
    uniqueNumber: z.array(z.union([z.string(), z.object({ uniqueNumber: z.string() })])),
    profilePicture: z.union([
      z.string(),
      z.instanceof(File).refine((file) => {
        return file.size <= maxFileSize && acceptedImageTypes.includes(file.type);
      }, {
        message: `The file size must not exceed 10MB and the file type must be one of the following: ${acceptedImageTypes.join(", ")}.`,
      }),
      z.undefined(),
    ]).nullable(),
  }).transform((val) => {
    return transformData(val);
  });

const transformData = (data: ProfileSendData) => {
  const transformedUniqueNumber = (data.uniqueNumber ?? []).map((item) => {
    if (typeof item === "object" && item !== null && "uniqueNumber" in item) {
      return item;
    }
    return { uniqueNumber: item };
  });
  const sendData: Record<string, string> = {};
  transformedUniqueNumber.forEach((item, index) => {
    if (typeof item === "object" && item.uniqueNumber !== undefined) {
      sendData[`uniqueNumber[${index}]`] = item.uniqueNumber;
    }
  });
  const submitData = { ...data, ...sendData };
  if (submitData.profilePicture === undefined || typeof submitData.profilePicture === "string") {
    delete submitData.profilePicture;
  }
  delete submitData.uniqueNumber;
  return submitData;
};

interface ProfileSendData {
  fullname: string
  nickname: string | null
  phoneNumber: string
  gender: string
  uniqueNumber?: Array<string | { uniqueNumber: string }>
  profilePicture?: string | File | null
}

