/* eslint-disable @typescript-eslint/naming-convention */
import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { documentFormSchema } from "./validation";
import { type z } from "zod";

export const useFormConfig = (redirect: RedirectAction) => {
  const { ...form } = useForm<z.infer<typeof documentFormSchema>>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: {
      document: [
       {
        documentName: "documentName",
       }
      ]
    },
    refineCoreProps: {
      resource: "document",
      redirect: false,
      meta: {
        headers: {
          "content-type": "multipart/form-data",
        },
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
