import { type IFormConfig } from "@src/common/interface";
import { Form } from "@/shadcn/components/form";
export const GeneralInfo: React.FC<{
  form: IFormConfig
}> = ({ form }) => {
  return (
    <div className="py-6 border-t border-gray-200 first:pt-0 last:pb-0 first:border-transparent dark:border-gray-700 dark:first:border-transparent">
      <label className="inline-block my-2 text-lg font-medium dark:text-white">
        ຂໍ້ມູນທົ່ວໄປ{" "}
      </label>
      <div className="flex flex-col w-full gap-2 capitalize rounded-lg sm:w-1/2 sm:flex-row">
        <div className="space-y-2 mr-0 sm:mr-7 ">
          <TypeDrivingLicenseSelect form={form}/>
          <TypeVaccineSelect form={form}/>
        </div>
        <div className="space-y-2 mr-0 sm:mr-7">
          <VehicleTypeSelect form={form}/>
        </div>
      </div>
    </div>
  );
};

const VehicleTypeSelect: React.FC<{ form: IFormConfig }> = ({ form }) => {
  const VehicleTypeOptions = [
    { label: "ລົດຈັກ", value: "Motorcycle" },
    { label: "ລົດຈັດໃຫຍ່", value: "Car" },
    { label: "ລົດບັນທຸກ", value: "Truck" },
    { label: "ລົດບັນທຸກ", value: "Cannot Drive" },
  ];
  return (
    <div className="w-full lg:w-80">
      <div className="w-full flex flex-col lg:flex-row lg:gap-x-5">
        <Form.Field {...form} name={"vehicleType"} label={"ທ່ານສາມາດໃຊ້ພາຫະນະປະເພດໃດ"}>
          <Form.RadioGroup className="flex flex-col" options={VehicleTypeOptions} isSquare={true}/>
        </Form.Field>
      </div>
    </div>
  );
};

const TypeDrivingLicenseSelect: React.FC<{ form: IFormConfig }> = ({ form }) => {
  const DrivingLicenceOptions = [
    { label: "ປະເພດ A", value: "A" },
    { label: "ປະເພດ B", value: "B" },
    { label: "ປະເພດ C", value: "C" },
    { label: "ປະເພດ D", value: "D" },
    { label: "ປະເພດ E", value: "E" },
    { label: "ບໍ່ມີໃບຂັບຂີ່", value: "NO_LICENSE" },
  ];
  return (
    <div className="w-full lg:w-80">
      <div className="w-full flex flex-col lg:flex-row lg:gap-x-5">
        <Form.Field {...form} name={"typeDrivingLicense"} label={"ໃບຂັບຂີ່"}>
          <Form.RadioGroup className="flex flex-col" options={DrivingLicenceOptions} isSquare={true}/>
        </Form.Field>
      </div>
    </div>
  );
};

const TypeVaccineSelect: React.FC<{ form: IFormConfig }> = ({ form }) => {
  const VaccinesOptions = [
    { label: "Sinopharm", value: "Sinopharm" },
    { label: "AstraZeneca", value: "AstraZeneca" },
    { label: "Pfizer", value: "Pfizer" },
    { label: "ບໍ່ໄດ້ຊັກ", value: "Unvaccinated" },
    { label: "ອື່ນໆ", value: "Other" },
  ];
  return (
    <div className="w-full lg:w-80">
      <div className="w-full flex flex-col lg:flex-row lg:gap-x-5">
        <Form.Field {...form} name={"typeVaccine"} label={"ທ່ານໄດ້ຮັບຢາວັກຊີນ"}>
          <Form.RadioGroup className="flex flex-col" options={VaccinesOptions} isSquare={true}/>
        </Form.Field>
      </div>
    </div>
  );
};

