import { documentFormSchema } from "./validation";
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { FormMultipart } from "@src/common/interface";
import { useProfileContext } from "../../../context";
import { type MetaQuery } from "@refinedev/core";
import React from "react";

export const useFormConfig = () => {
  const { state, dispatch } = useProfileContext();
  const { ...form } = useForm<z.infer<typeof documentFormSchema>>({
    resolver: zodResolver(documentFormSchema),
    refineCoreProps: {
      resource: "document",
      redirect: false,
      meta: FormMultipart as MetaQuery,
      onMutationSuccess: (data) => {
        dispatch({ type: "setIsUploaded", payload: true });
      },
      successNotification: () => {
        return { message: "ສ້າງເອກສານຄັດຕິດສໍາເລັດ", type: "success" };
      },
    },
    warnWhenUnsavedChanges: true,
  });
  React.useEffect(() => {
    form.setValue("profileId", state?.profileId);
  }, [state?.profileId]);
  return { form, state };
};
