import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

export const usePersonalAddressEditForm = ({ id }: { id: number }) => {
  const router = useRouter();
  const { ...form } = useForm<{ id?: number }>({
    resolver: zodResolver(personalAddressSchema),
    defaultValues: {
      profile: 0,
      status: "",
      village: "",
      province: "",
      district: 0,
    },
    refineCoreProps: {
      resource: "personal_address",
      redirect: false,
      action: "edit",
      id,
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
  district: z.number(),
  village: z.string(),
  province: z.string(),
});

