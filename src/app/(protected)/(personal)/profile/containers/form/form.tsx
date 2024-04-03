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
import { FormMultipart } from "@src/common/interface";
import { type MetaQuery } from "@refinedev/core";

interface ProfileFormProps {
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
  isEmployee,
}) => {
  const formConfig = useFormConfig();
  const profileId = formConfig.state?.profileId ?? 0;
  return (
    <div className="w-[90%] mx-20 rounded-full">
      {!profileId
        ? (<Form {...formConfig.form} cardClassName="w-full flex flex-col">
          <div className="flex flex-col w-full capitalize rounded-lg sm:w-1/2 sm:flex-row">
            <BasicInformationSection formConfig={formConfig} isEmployee={isEmployee}/>
            <PersonalInformationSection formConfig={formConfig} isEmployee={isEmployee}/>
          </div>
        </Form>)
        : (<p className="italic">ສຳເລັດແລ້ວ !</p>)}
    </div>
  );
};

const useFormConfig = () => {
  const { state, dispatch } = useProfileContext();
  const { ...form } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    refineCoreProps: {
      resource: "profile",
      meta: FormMultipart as MetaQuery,
      onMutationSuccess: (data) => {
        dispatch({ type: "setProfileId", payload: data?.data?.id ?? 0 });
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
  return { form, state };
};
