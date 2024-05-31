import { Form } from "@/shadcn/components/form";
import { useApplicationForm, useFormConfig } from "./config";
import {
  EmergencyInformationSection,
  AppliedFor,
  GeneralInfo,
} from "../form-fields";
import { Input, Textarea } from "@src/shadcn/elements";
import { useApplicationContext } from "../../context";
import { BadgeCheck } from "lucide-react";
export const ApplicationForm: React.FC = () => {
  const { form } = useFormConfig();
  const { state } = useApplicationContext();
  const isCompleted = state.applicationId;
  return (
    <div className="rounded-full">
      {isCompleted
        ? (
          <p className="italic">ສຳເລັດແລ້ວ !</p>)
        : (
          <Form {...form}>
            <AppliedFor form={{ form }} />
            <EmergencyInformationSection form={{ form }} />
          </Form>)}
    </div>
  );
};

export const Application2Form: React.FC = () => {
  const { form } = useApplicationForm();
  const { state } = useApplicationContext();
  const tagId = state.tagId ?? "";
  const isCompleted = state.updateApplicationId;

  return (
    <div className="rounded-full w-72 sm:w-[710px]">
      {isCompleted
        ? (
          <Success tagId={tagId} />)
        : (
          <Form {...form}>
            <GeneralInfo form={{ form }} />
            <Form.Field require={false} {...form} name="appliedReason" label="ເປັນຫຍັງທ່ານຈື່ງເຮັດວຽກນໍາບໍລິສັດພວກເຮົາ ?" >
              <Textarea className="h-28" />
            </Form.Field>
            <Form.Field require={false} {...form} name="pledgeReason" label="ຖ້າໄດ້ເປັນພະນັກງານຂອງພວກເຮົາທ່ານຈະປະຕິຍານຕົນແນວໃດ ?" >
              <Textarea className="h-28" />
            </Form.Field>
            <ApplicantSignatureChckbox {...form}/>
          </Form>)}
    </div>
  );
};

const ApplicantSignatureChckbox = (form: any) => (
  <Form.Field {...form} name="applicantSignature" label="ການຍອມຮັບ">
    <div className="flex">
      <Input type="checkbox" className="w-5 h-5" />
      <p className="pt-1.5 ml-1">ຂ້ອຍຍອມຮັບວ່າຂໍ້ມູນທຸກຢ່າງຂ້າງເທີງແມ່ນຂໍ້ມູນຈິງແທ້</p>
    </div>
  </Form.Field>
);

export const Success: React.FC<{ tagId: string }> = ({ tagId }) => {
  return (
    <div className="bg-white md:mx-auto">
      <BadgeCheck className="justify-center mx-auto h-14 w-14  " color="#004cff" />
      <div className="overflow-y-auto text-center">
        <h3 className="text-base font-semibold text-center text-gray-900 md:text-2xl">ສົ່ງແບບຟອມສະໝັກສໍາເລັດ!</h3>
        <p className="my-2 text-gray-600">ຂອບໃຈ ທີ່ມາສະໝັກວຽກສະມັກກັບພວກເຮົາ</p>
        <p className="my-2 text-gray-600">ເລກລະຫັດຟອມ: <span className="text-gray-900">{tagId}</span></p>
      </div>
    </div>
  );
};
