import { useUpdate } from "@refinedev/core";
export const useUpdateApplication = () => {
  const { mutate } = useUpdate();
  const updateApplication = ({ id, value }: { id: number, value: string }) => {
    mutate({
      resource: "application",
      values: {
        applicationStatus: value,
      },
      id,
    });
  };
  return { updateApplication };
};
