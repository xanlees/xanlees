import React from "react";
import { Form } from "@src/shadcn/components/form";
import { District, Province, Village } from "./form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

export function PersonalAddressCreateForm({ isCurrent, profileId }: { isCurrent: boolean, profileId: number }) {
  const status = isCurrent ? "ທີ່ຢູ່ປະຈຸບັນ" : "ທີ່ຢູ່ເກີດ";
  const { form } = usePersonalAddressCreateForm({ profileId, status });
  return (
    <Form {...form}>
      <div className="flex flex-wrap gap-2">
        <Village form={form } title={status} />
        <Province form={ form } />
        <District form={form } />
      </div>
    </Form>
  );
}

export const usePersonalAddressCreateForm = ({ profileId, status }: { profileId: number, status: string }) => {
  const router = useRouter();
  const { ...form } = useForm<{ id?: number }>({
    resolver: zodResolver(personalAddressSchema),
    defaultValues: {
      profile: profileId,
      status,
      village: "",
      province: "",
      district: 0,
    },
    refineCoreProps: {
      resource: "personal_address",
      redirect: false,
      onMutationSuccess: () => {
        router.back();
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
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

