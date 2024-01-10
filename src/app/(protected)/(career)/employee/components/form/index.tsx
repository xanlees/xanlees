import { type RedirectAction } from "@refinedev/core";
import { Input } from "@src/shadcn/elements";
import { Form } from "@/shadcn/components/form";
import { useFormConfig } from "./config";
import { DatePickerField } from "@src/shadcn/components/form/datepicker";
import { usePositionSelect } from "../../lib/select";

interface IFormConfig {
  form: {
    setValue: any
  }
}

export const EmployeeForm = ({ redirect = "list", id }: { redirect: RedirectAction, id: number }) => {
  const formConfig = useFormConfig(redirect, id);
  const position = usePositionSelect();
  return (
    <div className="mx-auto w-96 ">
      <Form {...formConfig.form}>
        <div className="flex flex-col w-full gap-3 flex-warp">
          <PositionSection formConfig={formConfig} position={position} />
          <Form.Field
            {...formConfig.form}
            name="joiningDate"
            label="ວັນທີ ເດືອນປີ ເຂົ້າວຽກ"
          >
            <DatePickerField className="w-80"/>
          </Form.Field>
          <div className="flex justify-start ">
            <Form.Field {...formConfig.form} name="isLatest" label="ແມ່ນຕໍາແໜ່ງລ່າ​ສຸດບໍ ?">
              <Input
                placeholder="isLatest"
                className="block w-5 h-5 rounded-lg"
                type="checkbox"
                defaultValue={"true"}
              />
            </Form.Field>
          </div>
        </div>
      </Form>
    </div>
  );
};

const PositionSection = ({
  formConfig,
  position,
}: {
  formConfig: IFormConfig
  position: any
}) => (
  <div className="inline-flex flex-row items-center justify-start gap-x-4">
    <Form.Field {...formConfig.form} name="positionId" label="ຕໍາແໜ່ງ">
      <Form.Combobox
        className="w-80"
        {...position}
        onChange={(value) => {
          formConfig.form.setValue("positionId", value);
        }}
      />
    </Form.Field>
  </div>
);
