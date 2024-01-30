import { useUpdate } from "@refinedev/core";

export const useUpdateDropdownSelect = (resource: string) => {
  const { mutate } = useUpdate();
  const onUpdate = ({ id, value, field }: { id: number; value: string; field: string }) => {
    const valuesToUpdate = {
      [field]: value,
    };
    mutate({
      resource,
      values: valuesToUpdate,
      id,
    });
  };
  return { onUpdate };
};
