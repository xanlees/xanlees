import { useUpdate } from "@refinedev/core";
import { IUpdateProps } from "../interface";

export const useUpdateOnSelect = ({ resource, id, field, isMultipartFormData }: IUpdateProps) => {
  const { mutate } = useUpdate();
  const onUpdateHandler = (value: any) => {
    const valueToUpdate = { [field]: value };
    const options: any = {
      resource,
      id,
      values: valueToUpdate,
    };

    if (isMultipartFormData) {
      options.meta = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
    }
    mutate(options);
  };

  return { onUpdateHandler };
};
