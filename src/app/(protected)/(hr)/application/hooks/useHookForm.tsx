import { useForm } from "@refinedev/react-hook-form";
import { type FieldValues } from "react-hook-form";
import { type UpdateResponse, type BaseRecord, type CreateResponse } from "@refinedev/core";

interface IFormHooksProps {
  onFinish: (values: FieldValues) => Promise<undefined | UpdateResponse<BaseRecord> | CreateResponse<BaseRecord>>
  formLoading: boolean
}

interface UseFormCustomProps {
  resource: string
}

export const useHookForm = ({ resource }: UseFormCustomProps): IFormHooksProps => {
  const {
    refineCore: { onFinish, formLoading },
  } = useForm({
    refineCoreProps: {
      successNotification: false,
      action: "edit",
      resource,
      redirect: false,
    },
  });
  const adjustedOnFinish: IFormHooksProps["onFinish"] = async(values) => {
    const result = await onFinish(values);
    return result as undefined | UpdateResponse<BaseRecord> | CreateResponse<BaseRecord>;
  };
  return { onFinish: adjustedOnFinish, formLoading };
};
