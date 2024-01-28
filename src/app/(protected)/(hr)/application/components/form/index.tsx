import { Form } from "@/shadcn/components/form";
import { useFormConfig } from "./config";
import {
  LanguageSkillSection,
  ComputerSkillSection,
  EmergencyInformationSection,
  SectionInput,
  DrivingLicenceOptions,
  DynamicVaccineInput,
} from "../../containers/form";
import { Input, Textarea } from "@src/shadcn/elements";
import { IFormConfig } from "@src/common/interface";

interface ApplicationFormProps {
  setCurrentStep?: (step: number) => void
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({ setCurrentStep }) => {
  const formConfig = useFormConfig({ setCurrentStep });
  return (
    <div className="rounded-full w-96 sm:w-[37%] ">
      <Form {...formConfig.form}>
        <EmergencyInformationSection formConfig={formConfig} />
        <ComputerSkillSection formConfig={formConfig} />
        <LanguageSkillSection formConfig={formConfig} />
        <SectionInput formConfig={formConfig} options={DrivingLicenceOptions} name="typeDrivingLicense" label="ໃບຂັບຂີ່" />
        <DynamicVaccineInput formConfig={formConfig} />
        <Form.Field {...formConfig.form} name="appliedReason" label="ເປັນຫຍັງທ່ານຈື່ງຢາກເຮັດວຽກກັບ ວິສາຫະກິດສ່ນບຸກຄົນ ເອັສບີເອັສ">
          <Textarea className="h-28" />
        </Form.Field>
        <Form.Field {...formConfig.form} name="pledgeReason" label="ຖ້າໄດ້ເປັນພະນັກງານຂອງ ເອັສບີເອັສ ແລ້ວທ່ານຈະປະຕິຍານຕົນແນວໃດ ?">
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
      <Input placeholder="ລະລັດຜ່ານ" type="checkbox" className="w-5 h-5" />
      <p className="pt-1.5 ml-1">ຂ້ອຍຮັບໃນເງື່ອນໄຂຂອງບໍລິສັດ</p>
    </div>
  </Form.Field>
);