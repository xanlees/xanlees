import { useSelect, type RedirectAction } from "@refinedev/core";
import { Input } from "@src/shadcn/elements";
import { Form } from "@/shadcn/components/form";
import { type IGroup } from "../../interface";
import { useFormConfig } from "./config";
import { type IFormConfig } from "@src/common/interface";

export const UserForm = ({
  redirect = "edit",
}: {
  redirect: RedirectAction
}) => {
  const formConfig = useFormConfig(redirect);
  const groups = useSelect<IGroup>({
    resource: "group",
    optionLabel: "name",
    optionValue: "name",
  });
  console.log("formConfig", formConfig.form.watch());
  return (
    <div className="w-1/2 mx-auto">
      <Form {...formConfig.form}>
        <UsernameInput {...formConfig} />
        <div className="flex w-full gap-3 flex-warp">
          <div className="w-1/2"><PasswordInput {...formConfig} /></div>
          <div className="w-1/2"><Password2ndInput {...formConfig} /></div>
        </div>
        <GroupSection formConfig={formConfig} groups={groups} />
        <StatusSection formConfig={formConfig} />
      </Form>
    </div>
  );
};

const UsernameInput = (formConfig: IFormConfig) => (
  <Form.Field {...formConfig.form} name="username" label="ຊື່ບັນຊີເຂົ້າໃຊ້ງານລະບົບ">
    <Input placeholder="ຊື່ບັນຊີເຂົ້າໃຊ້ງານລະບົບ" />
  </Form.Field>
);

const PasswordInput = (formConfig: IFormConfig) => (
  <Form.Field {...formConfig.form} name="password" label="ລະລັດຜ່ານ">
    <Input placeholder="ລະລັດຜ່ານ" />
  </Form.Field>
);

const Password2ndInput = (formConfig: IFormConfig) => (
  <Form.Field {...formConfig.form} name="confirmPassword" label="ຢືນ​ຢັນ​ລະ​ຫັດ">
    <Input placeholder="ຢືນ​ຢັນ​ລະ​ຫັດ" />
  </Form.Field>
);

const GroupSection = ({ formConfig, groups }: { formConfig: IFormConfig, groups: any }) => (
  <div className="inline-flex flex-row items-center justify-start gap-x-4">
    <Form.Field {...formConfig.form} name="groups" label="ສິດຂອງບັນຊີໃຊ້ງານລະບົບ">
      <Form.Combobox
        {...(groups)}
      />
    </Form.Field>
  </div>
);

const StatusSection = ({ formConfig }: { formConfig: IFormConfig }) => (
  <Form.Field {...formConfig.form} name="isActive" label="ສະຖານະ">
    <Form.Select
      options={[
        {
          label: "ເປີດໃຊ້ງານ",
          value: "true",
        },
        {
          label: "ປີດໃຊ້ງານ",
          value: "false",
        },
      ]}
      defaultValue="false"
    />
  </Form.Field>
);
