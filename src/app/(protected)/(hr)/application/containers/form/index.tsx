import { Form } from "@/shadcn/components/form";
import { useAppcationForm, useFormConfig } from "./config";
import {
  EmergencyInformationSection,
  AppliedFor,
  GeneralInfo,
} from "../form-fields";
import { Input, Textarea } from "@src/shadcn/elements";
import { type IFormConfig } from "@src/common/interface";
import { useApplicationContext } from "../../..";
export const ApplicationForm: React.FC = () => {
  const formConfig = useFormConfig({ isUpdate: true });
  const { state } = useApplicationContext();
  const isCompleted = state.applicationId;

  return (
    <div className="mx-20 rounded-full">
      {isCompleted
        ? (
          <p className="italic">ສຳເລັດແລ້ວ !</p>)
        : (
          <Form {...formConfig.form}>
            <AppliedFor formConfig={formConfig} />
            <EmergencyInformationSection formConfig={formConfig} />
          </Form>)}
    </div>
  );
};

export const Application2Form: React.FC = () => {
  const formConfig = useAppcationForm();
  const { state } = useApplicationContext();
  const isCompleted = state.updateApplicationId;

  return (
    <div className="mx-20 rounded-full">
      {!isCompleted
        ? (
          <Form {...formConfig.form}>
            <GeneralInfo formConfig={formConfig} />
            <Form.Field require={false} {...formConfig.form} name="appliedReason" label="ເປັນຫຍັງທ່ານຈື່ງຢາກເຮັດວຽກກັບ ວິສາຫະກິດສ່ນບຸກຄົນ ເອັສບີເອັສ" >
              <Textarea className="h-28" />
            </Form.Field>
            <Form.Field require={false} {...formConfig.form} name="pledgeReason" label="ຖ້າໄດ້ເປັນພະນັກງານຂອງ ເອັສບີເອັສ ແລ້ວທ່ານຈະປະຕິຍານຕົນແນວໃດ ?" >
              <Textarea className="h-28" />
            </Form.Field>
            <ApplicantSignatureChckbox {...formConfig} />
          </Form>)
        : (
          <p className="italic">ສຳເລັດແລ້ວ !</p>)}
    </div>
  );
};

const ApplicantSignatureChckbox = (formConfig: IFormConfig) => (
  <Form.Field {...formConfig.form} name="applicantSignature">
    <div className="flex">
      <Input type="checkbox" className="w-5 h-5" />
      <p className="pt-1.5 ml-1">ຂ້ອຍຮັບໃນເງື່ອນໄຂຂອງບໍລິສັດ</p>
    </div>
  </Form.Field>
);

export const FormHeader = () => (
  <div className="mb-8 text-center">
    <h2 className="text-2xl font-bold text-gray-800 md:text-3xl dark:text-gray-200">
      Payment
    </h2>
    <p className="text-sm text-gray-600 dark:text-gray-400">
      Manage your payment methods.
    </p>
  </div>
);
