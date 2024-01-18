import { type RedirectAction } from "@refinedev/core";
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
import { Label, Textarea } from "@src/shadcn/elements";
import { RadioGroup } from "@radix-ui/react-dropdown-menu";
import { RadioGroupItem } from "@src/shadcn/elements/radio-group";

export const ApplicationForm = ({ redirect = "list", id }: { redirect: RedirectAction, id: number }) => {
  const formConfig = useFormConfig(redirect, id);
  return (
    <div className="rounded-full w-96 sm:w-[37%] ">
      <Form {...formConfig.form}>
        <EmergencyInformationSection formConfig={formConfig} />
        <ComputerSkillSection formConfig={formConfig} />
        <LanguageSkillSection formConfig={formConfig} />
        <SectionInput formConfig={formConfig} options={DrivingLicenceOptions} name="typeDrivingLicence" label="ໃບຂັບຂີ່"/>
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


