import { useUpdate } from "@refinedev/core";
import { IUpdateProps } from "../interface";
import { useRouter } from "next/navigation";

export const useUpdateOnSelect = ({ resource, id, field, isMultipart, redirect = false }: IUpdateProps) => {
  const router = useRouter();
  const { mutate } = useUpdate();
  const onUpdateHandler = (value: any) => {
    const valueToUpdate = { [field]: value };
    const options: any = {
      resource,
      id,
      values: valueToUpdate,
      meta: isMultipart
        ? { headers: { "content-type": "multipart/form-data" } }
        : undefined,
    };
    mutate(options, {
      onSuccess: (data, status) => {
        if (typeof redirect === "string") {
          router.push(redirect);
        }
      },
    });
  };
  return { onUpdateHandler };
};
