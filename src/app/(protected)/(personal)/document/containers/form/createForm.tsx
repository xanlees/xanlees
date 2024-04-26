import React from "react";
import { Input } from "@src/shadcn/elements";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import type * as z from "zod";
import { Form } from "@src/shadcn/components/form";
import { FormMultipart } from "@src/common/interface";
import { type MetaQuery, type FormAction } from "@refinedev/core";
import { documentFormSchema } from "./validation";

export const DocumentCreateForm: React.FC<{ id: number, action: FormAction }> = ({ id, action }) => {
  const { form } = useDocumentFormEdit(id);
  return (
    <div className="flex justify-center">
      <div className="flex flex-col border rounded-2xl">
        <div className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">
        ສ້າງເອກສະສານ
        </div>
        <Form {...form}>
          <div className="flex flex-wrap gap-2">
            <div className="w-full lg:w-80 ">
              <div className="relative w-full mb-3">
                <Form.Field {...form} name="document.[0].documentName" label="ຊື່ເອກສານ" >
                  <Input placeholder="ຊື່ເອກສານ" />
                </Form.Field>
              </div>
            </div>
            <div className="w-full lg:w-80 ">
              <div className="relative w-full mb-3">
                <Form.Field {...form} name="document.[0].documentFile" label="ເລືອກເອກະສານທີ່ຈະເພີ່ມ (ເປັນ PDF ໄຟລ໌)" >
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

export const useDocumentFormEdit = (id: number) => {
  const { ...form } = useForm<z.infer<typeof documentFormSchema>>({
    resolver: zodResolver(documentFormSchema),
    refineCoreProps: {
      resource: "document",
      redirect: false,
      meta: FormMultipart as MetaQuery,
      successNotification: () => {
        return { message: "ສ້າງເອກສານຄັດຕິດສໍາເລັດ", type: "success" };
      },
    },
    warnWhenUnsavedChanges: true,
  });
  React.useEffect(() => {
    form.setValue("document.[0].profileId", id);
  }, [id]);
  return { form };
};

