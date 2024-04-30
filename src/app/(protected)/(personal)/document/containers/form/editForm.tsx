import React from "react";
import { Input } from "@src/shadcn/elements";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import * as z from "zod";
import { Form } from "@src/shadcn/components/form";
import { FormMultipart } from "@src/common/interface";
import { type FormAction } from "@refinedev/core";
import { useRouter } from "next/navigation";

export const DocumentEditForm: React.FC<{ id: number, action: FormAction }> = ({ id, action }) => {
  const { form } = useDocumentFormEdit(id, action);
  return (
    <div className="flex justify-center">
      <div className="flex flex-col border rounded-2xl">
        <div className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">
          ເອກສະສານ
        </div>
        <Form {...form}>
          <div className="flex flex-wrap gap-2">
            <div className="w-full lg:w-80 ">
              <div className="relative w-full mb-3">
                <Form.Field {...form} name="documentName" label="ຊື່ເອກສານ" >
                  <Input placeholder="ຊື່ເອກສານ" />
                </Form.Field>
              </div>
            </div>
            <div className="w-full lg:w-80 ">
              <div className="relative w-full mb-3">
                <Form.Field {...form} name="documentFile" label="ເລືອກເອກະສານທີ່ຈະເພີ່ມ (ເປັນ PDF ໄຟລ໌)" >
                  <Form.FileInput showFileDisplay={false} />
                </Form.Field>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

const useDocumentFormEdit = (id: number, action: FormAction) => {
  const router = useRouter();
  const { ...form } = useForm<z.infer<typeof documentSchema>>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      documentName: "",
      documentFile: undefined,
      profileId: 0,
    },
    refineCoreProps: {
      resource: "document",
      redirect: false,
      action: "edit",
      id,
      meta: FormMultipart,
      onMutationSuccess: () => {
        router.back();
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};

const documentSchema = z.object({
  documentName: z.string(),
  profileId: z.number(),
  documentFile: z.union([z.string(), z.instanceof(File), z.undefined()])
    .refine((data) => typeof data === "string" || data instanceof File || data === undefined, {
      message: "The file must be a valid File object, an existing document URL, or undefined.",
    })
    .transform((data) => typeof data === "string" || data instanceof File ? data : undefined),
}).transform((data) => {
  if (typeof data.documentFile === "undefined") {
    delete data.documentFile;
  }
  if (typeof data.documentFile === "string") {
    delete data.documentFile;
  }
  return data;
});
