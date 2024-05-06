import React from "react";
import { Input } from "@src/shadcn/elements";
import { Form } from "@/shadcn/components/form";
import { useGraduationSelect } from "../../hook/form/useGraduationSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

export const EducationCreateForm: React.FC<{ profileId: number }> = ({ profileId }) => {
  const { form } = useEducationFormCreate({ profileId });
  const graduation = useGraduationSelect();
  return (
    <div className="flex justify-center">
      <div className="flex flex-col border rounded-2xl">
        <div className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">
            ຟອມຂໍ້ມູນການສຶກສາ
        </div>
        <Form {...form}>
          <div className="flex gap-x-2">
            <Form.Field {...form} name="branch" label="ສະຖາບັນ">
              <Input placeholder="" className="block w-56" />
            </Form.Field>
            <Form.Field {...form} name="graduationId" label="ພາກວີຊາ">
              <Form.Combobox {...(graduation as any)} />
            </Form.Field>
            <Form.Field {...form} name="year" label="ຈົບສົກປີ">
              <Input placeholder="2018" numericOnly className="block w-full sm:w-28" />
            </Form.Field>
          </div>
        </Form>
      </div>
    </div>
  );
};

export const useEducationFormCreate = ({ profileId }: { profileId: number }) => {
  const router = useRouter();
  const { ...form } = useForm<z.infer<typeof graduationSchema>>({
    resolver: zodResolver(graduationSchema),
    defaultValues: {
      branch: "",
      graduationId: 0,
      profileId,
      year: "",
    },
    refineCoreProps: {
      resource: "education",
      redirect: false,
      action: "create",
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
    profileId: z.number(),
    year: z.string(),
  });
