/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { useProvinceSelect } from "@personal";
import { Form } from "@src/shadcn/components/form";
import { Card, Input } from "@src/shadcn/elements";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@src/shadcn/elements/accordion";
import Image from "next/image";

import { PositionForm } from "../../../position/form";
import { SectorForm } from "../../../sector/component";
import { useBranchForm } from "../../hook/useBranchForm";
import { getTypeOptions } from "../../lib";
import { LeaveQuota, MapInput, ProvinceField } from "./formField";

export const BranchCreateForm: React.FC<{ type: string, hideButton: boolean }> = ({ type, hideButton }) => {
  return (
    <div className="p-10 my-3 rounded-full ">
      {type !== "LOTTERY" && <PositionForm type={type} />}
      {type !== "LOTTERY" && <BranchForm type={type} hideButton={hideButton} />}
      <SectorForm type={type} />
    </div>
  );
};

const BranchForm: React.FC<{ type: string, hideButton: boolean }> = ({ type, hideButton }) => {
  const title = type === "LOTTERY" ? "ຊອກສາຂາບໍ່ເຫັນ" : "ຊອກຫ້ອງການບໍ່ເຫັນ";
  return (
    <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
      <AccordionItem value="item-1">
        <AccordionTrigger className="italic text-blue-500 underline" >
          *{title}, ສາມາດກົດທີ່ນີ້ເພື່ອສ້າງເພີ່ມ
        </AccordionTrigger>
        <AccordionContent>
          <FormBranchContainer type={type} hideButton={hideButton} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export const FormBranchContainer: React.FC<{ type: string, id?: number, hideButton: boolean }> = ({ type, id, hideButton }) => {
  const branchName = type === "LOTTERY" ? "ເມືອງ" : "ຊື່";
  const title = type === "LOTTERY" ? "ຟອມສາຂາ" : "ຟອມຫ້ອງການ";
  const { form } = useBranchForm({ type, id });
  const province = useProvinceSelect();
  const filteredTypeList = getTypeOptions(type);
  return (
    <>
      <Form {...form} >
        <div className="text-2xl font-bold tracking-wide text-center text-gray-800 dark:text-white">
          {title}
        </div>
        <div className="relative w-full mb-3">
          <Form.Field {...form} name="name" label={branchName}>
            <Input placeholder="" className="w-full" />
          </Form.Field>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="w-full lg:w-64 ">
            <ProvinceField form={{ form }} province={province} />
          </div>
          <div className="w-full lg:w-64 ">
            <div className="relative w-full mb-3">
              <Form.Field {...form} name="type" label="ປະເພດຫ້ອງການ">
                <Form.Combobox {...(filteredTypeList as any)} />
              </Form.Field>
            </div>
          </div>
        </div>
        <LeaveQuota />
        <MapInput />
        <div className="w-full lg:w-64 ">
          <div className="relative w-full mb-3">
            <Form.Field {...form} name="gpsWifi" label="ປໍ້າໂມງເຂົ້າດ້ວຍ GPS ຫລື WIFI">
              <Form.Combobox {...(GPSWiFiChoice as any)}/>
            </Form.Field>
          </div>
        </div>
      </Form>
      <Card className="rounded-lg my-2">
        <div className="max-w-md mx-auto p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">ວິທີການສຳເນົາພິກັດຈາກ Google Maps</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>ເປີດ Google Maps:</strong> <a href={somchainuekURMap} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">ໄປທີ່ Google Maps</a>.</li>
            <li><strong>ຫາສະຖານທີ່:</strong> ຄົ້ນຫາສະຖານທີ່ຕັ້ງຫ້ອງການ.</li>
            <li><strong>ຄລິກຂວາ:</strong> ຄລິກຂວາເທິງສະຖານທີ່.</li>
            <li><strong>ເລືອກ “ເສັ້ນທາງໄປບ່ອນນີ້”:</strong> ຈະມີການປັກໝຸດແລະສະແດງພິກັດທາງລຸ່ມ.</li>
            <li><strong>ສຳເນົາພິກັດ:</strong> ຄລິກເອົາພິກັດທີ່ສະແດງແລະສຳເນົາ.</li>
          </ul>
          <Image
            src="/image/google_map.png"
            width={500}
            height={500}
            alt="Google Map"
          />
        </div>
      </Card>
    </>

  );
};
export const GPSWiFiChoice = {
  options: [
    { label: "GPS", value: "GPS" },
    { label: "WIFI", value: "WIFI" },
  ],
};

const somchainuekURMap = "https://www.google.com/maps/place/%E0%BA%AA%E0%BA%BB%E0%BA%A1%E0%BB%83%E0%BA%88%E0%BA%99%E0%BA%B6%E0%BA%81%E0%BA%82%E0%BA%BB%E0%BA%99%E0%BA%AA%E0%BA%BB%E0%BB%88%E0%BA%87+SCNExpress+%E0%BA%AA%E0%BB%8D%E0%BA%B2%E0%BA%99%E0%BA%B1%E0%BA%81%E0%BA%87%E0%BA%B2%E0%BA%99%E0%BB%83%E0%BA%AB%E0%BA%8D%E0%BB%88/@17.9243703,102.6516283,19z/data=!3m1!4b1!4m6!3m5!1s0x31246773254229d7:0xf5fd31bbcd3aecb3!8m2!3d17.924369!4d102.652272!16s%2Fg%2F11rv91dpf4?entry=ttu";
