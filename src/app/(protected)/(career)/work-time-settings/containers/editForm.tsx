import { type IFormConfig } from "@src/common/interface";
import { Form } from "@src/shadcn/components/form";
import { Input } from "@src/shadcn/elements";

import {
  useBranchFormSelect, useWorkTimeSettings, useWorkTimeSettingsEditForm,
} from "../hook/useWorkTimeSettings";
import { type IWorkTimeSettings } from "../interface";
import { dayOfWeek } from "./form";

export const WorkTimeSettingsEditForm = ({ branchId }: { branchId: number }) => {
  const { data: workTimeSettingsData } = useWorkTimeSettings<IWorkTimeSettings>({ branchId });
  const daysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const sortedWorkTimeSettings = workTimeSettingsData?.sort((a, b) => {
    return daysOrder.indexOf(a.dayOfWeek) - daysOrder.indexOf(b.dayOfWeek);
  });
  return <>
    {sortedWorkTimeSettings?.[0]?.id && <ContainerFormLastTime settingId={sortedWorkTimeSettings?.[0]?.id} key={`lastTime-${sortedWorkTimeSettings?.[0]?.id}`} />}
    {sortedWorkTimeSettings?.map((item, index) => {
      return <div key={`setting-${item.id}`}>
        {item.id && <ContainerForm settingId={item.id} />}
      </div>;
    })}
  </>;
};

const ContainerForm = ({ settingId }: { settingId: number }) => {
  const { form } = useWorkTimeSettingsEditForm({ settingId, editLateTime: true });
  return (
    <div className="m-2">
      <Form {...form}>
        <FormFieldInputContainer form={{ form }} />
      </Form>
    </div>
  );
};

const ContainerFormLastTime = ({ settingId }: { settingId: number }) => {
  const { form } = useWorkTimeSettingsEditForm({ settingId, editLateTime: false });
  return (
    <div className="m-2">
      <Form {...form}>
        <FormFieldContainer form={{ form }} settingId={settingId} />
      </Form>
    </div>

  );
};

const FormFieldContainer = ({ settingId, form }: { settingId: number, form: IFormConfig }) => {
  const branch = useBranchFormSelect();
  return (
    <div className="flex flex-wrap gap-2">
      <div className="w-full lg:w-80 ">
        <div className="relative w-full mb-3">
          <Form.Field {...form} name="branch" label="ເລືອກຫ້ອງການ">
            <Form.Combobox {...(branch as any)} className="w-full lg:w-80" disabled/>
          </Form.Field>
        </div>
      </div>
      <div className="w-full lg:w-80 ">
        <div className="relative w-full mb-3">
          <Form.Field {...form} name="lateTime" label="ມາຊ້າ ຫຼື ກັບກ່ອນເວລາໄດ້ຈັກນາທິ (ນາທີ)" >
            <Input placeholder="15" className="w-full" numericOnly />
          </Form.Field>
        </div>
      </div>
    </div>
  );
};

const FormFieldInputContainer: React.FC<{ form: IFormConfig }> = ({ form }) => {
  return (
    <div className="flex gap-x-1 w-full mb-3">
      <Form.Field {...form} name="dayOfWeek" label="ມື້" disabled>
        <Form.Combobox {...(dayOfWeek as any)} className="w-full lg:w-80" disabled/>
      </Form.Field>
      <Form.Field {...form} name="checkInTime" label="ເວລາເຂົ້າວຽກ" >
        <Input type="time" className="block w-full sm:w-40" />
      </Form.Field>
      <Form.Field {...form} name="checkOutTime" label="ເວລາເລີກວຽກ" >
        <Input type="time" className="block w-full sm:w-40" />
      </Form.Field>
    </div>
  );
};
