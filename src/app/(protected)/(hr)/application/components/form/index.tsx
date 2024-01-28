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
import { Textarea } from "@src/shadcn/elements";

interface ApplicationFormProps {
  setCurrentStep?: (step: number) => void
  state?: {
    profileId: number
  }
  dispatch: any
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({ setCurrentStep, state, dispatch }) => {
  const formConfig = useFormConfig({ setCurrentStep, state, dispatch });
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
      </Form>
    </div>
  );
};
