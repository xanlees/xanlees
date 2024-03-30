import { Form } from "@/shadcn/components/form";
import { useFormConfig } from "./config";
import {
  LanguageSkillSection,
  ComputerSkillSection,
  EmergencyInformationSection,
  AppliedFor,
  GeneralInfo,
} from "../form-fields";
import { Input, Textarea } from "@src/shadcn/elements";
import { type IFormConfig } from "@src/common/interface";

interface ApplicationFormProps {
  setCurrentStep?: (step: number) => void
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  setCurrentStep,
}) => {
  const formConfig = useFormConfig({ setCurrentStep });
  return (
    <div className="rounded-full w-96 sm:w-[37%] ">
      <Form {...formConfig.form}>
        <AppliedFor formConfig={formConfig} />
        <EmergencyInformationSection formConfig={formConfig} />
        <ComputerSkillSection formConfig={formConfig} />
        <LanguageSkillSection formConfig={formConfig} />
        <GeneralInfo formConfig={formConfig} />
        <Form.Field
          {...formConfig.form}
          name="appliedReason"
          label="ເປັນຫຍັງທ່ານຈື່ງຢາກເຮັດວຽກກັບ ວິສາຫະກິດສ່ນບຸກຄົນ ເອັສບີເອັສ"
        >
          <Textarea className="h-28" />
        </Form.Field>
        <Form.Field
          {...formConfig.form}
          name="pledgeReason"
          label="ຖ້າໄດ້ເປັນພະນັກງານຂອງ ເອັສບີເອັສ ແລ້ວທ່ານຈະປະຕິຍານຕົນແນວໃດ ?"
        >
          <Textarea className="h-28" />
        </Form.Field>
        <ApplicantSignatureChckbox {...formConfig} />
      </Form>
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
