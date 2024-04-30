import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

export const useEducationFormEdit = (id: number) => {
  const router = useRouter();
  const { ...form } = useForm<z.infer<typeof graduationSchema>>({
    resolver: zodResolver(graduationSchema),
    defaultValues: {
      branch: "",
      graduationId: 0,
      profileId: 0,
      year: "",
    },
    refineCoreProps: {
      resource: "education",
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

const graduationSchema = z
  .object({
    branch: z.string(),
    graduationId: z.number(),
    year: z.string(),
  });
