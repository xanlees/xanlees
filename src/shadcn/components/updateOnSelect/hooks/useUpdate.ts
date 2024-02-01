import { useUpdate } from "@refinedev/core";
import { IUpdateProps } from "../interface";

export const useUpdateOnSelect = ({resource, id, field}:IUpdateProps) => {
  const { mutate } = useUpdate();
  const onUpdateHandler = (value: any ) => {
    const valueToUpdate = { [field]: value };
    mutate({ resource, values: valueToUpdate, id });
  };
  return { onUpdateHandler };
};

