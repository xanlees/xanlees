import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { useProfileContext } from "../..";
import * as z from "zod";
import { useEffect, useRef } from "react";
import { type IFormConfig } from "@src/common/interface";

export const usePersonalAddressForm = ({ status }: { status: string }) => {
  const { state, dispatch } = useProfileContext();
  const profile = state.profileId ?? 0;
  const personalCurrentAddressId = state.personalBornAddressId ?? 0;
  const type = personalCurrentAddressId ? "setPersonalCurrentAddressId" : "setPersonalBornAddressId";
  const { ...form } = useForm<{ id?: number }>({
    resolver: zodResolver(personalAddressSchema),
    defaultValues: {
      profile: 0,
      status,
      village: "",
      province: "",
      district: 0,
    },
    refineCoreProps: {
      resource: "personal_address",
      redirect: false,
      onMutationSuccess: (data) => {
        dispatch({ type, payload: data?.data?.id ?? 0 });
      },
      successNotification: () => {
        return { message: `ສ້າງຂໍ້ມູນ${status}`, type: "success" };
      },
    },
    warnWhenUnsavedChanges: true,
  });
  useUpdateDefaultValues(form as any, profile);
  return { form, state };
};
const useUpdateDefaultValues = (form: IFormConfig, profile: number) => {
  const profileRef = useRef(profile);
  useEffect(() => {
    if (profileRef.current !== profile) {
      form.setValue?.("profile", profile);
      profileRef.current = profile;
    }
  }, [profile]);
};

const personalAddressSchema = z.object({
  profile: z.number(),
  status: z.string(),
  district: z.number().min(0, {
    message: "ກະລຸນາເລືອກເມືອງ",
  }),
  village: z.string().min(1, {
    message: "ກະລຸນາປ້ອນຊື່ບ້ານ",
  }),
  province: z.string().min(1, {
    message: "ກະລຸນາເລືອກແຂວງ",
  }),
});

