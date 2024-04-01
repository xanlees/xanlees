import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { getErrorMessageNotification } from "@src/common/lib/errorNotification";
import { Form } from "@src/shadcn/components/form";

import { useProfileContext } from "../../../context";
import { errorMessages } from "../../containers/form/constant";
import { profileSchema } from "../../containers/form/validation";
import { BasicInformationSection } from "../form-fields/BasicInformationSection";
import { PersonalInformationSection } from "../form-fields/PersonalInformationSection";

interface ProfileFormProps {
  setCurrentStep?: (step: number) => void
  setProfileID?: (id: number) => void
  isEmployee?: boolean
}

const defaultMessage = "ບໍ່ສາມາດສ້າງຂໍ້ມູນສ່ວນບຸຄົນໄດ້";
export interface ProfileFormValues {
  id?: number
}
interface IMessages {
  response: {
    data: Record<string, any>
  }
}
export const ProfileForm: React.FC<ProfileFormProps> = ({
  setCurrentStep,
  isEmployee,
}) => {
  const formConfig = useFormConfig({ setCurrentStep });
  return (
    <div className="w-[90%] mx-20 rounded-full">
      <Form {...formConfig.form} cardClassName="w-full flex flex-col">
        <div className="flex flex-col w-full capitalize rounded-lg sm:w-1/2 sm:flex-row">
          <BasicInformationSection formConfig={formConfig} isEmployee={isEmployee}/>
          <PersonalInformationSection formConfig={formConfig} isEmployee={isEmployee}/>
        </div>
      </Form>
    </div>
  );
};

const useFormConfig = ({ setCurrentStep }: { setCurrentStep?: ((step: number) => void) | undefined }) => {
  const { state, dispatch } = useProfileContext();
  const { ...form } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      personalAddressId: state.personalAddressId,
    },
    refineCoreProps: {
      resource: "profile",
      meta: {
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          "content-type": "multipart/form-data",
        },
      },
      autoSave: {
        enabled: true,
      },
      onMutationSuccess: (data) => {
        dispatch({ type: "setProfileId", payload: data?.data?.id ?? 0 });
        (setCurrentStep != null) && setCurrentStep(2);
      },
      errorNotification: (data: any) => {
        const responseData = (data as IMessages).response.data;
        return getErrorMessageNotification({ responseData, errorMessages, defaultMessage });
      },
      successNotification: false,
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
