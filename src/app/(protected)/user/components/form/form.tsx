import { useSelect, type RedirectAction } from "@refinedev/core";
import { Input } from "@src/shadcn/elements";
import { Form } from "@/shadcn/components/form";
import { type IGroup } from "../../interface";
import { useFormConfig } from "./config";
import { IFormConfig } from "@src/common/interface";

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
  console.log("groups", groups);

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
  <Form.Field {...formConfig.form} name="username" label="Username">
    <Input placeholder="Username" />
  </Form.Field>
);

const PasswordInput = (formConfig: IFormConfig) => (
  <Form.Field {...formConfig.form} name="password" label="Password">
    <Input placeholder="Password" />
  </Form.Field>
);

const Password2ndInput = (formConfig: IFormConfig) => (
  <Form.Field {...formConfig.form} name="confirmPassword" label="Confirm Password">
    <Input placeholder="Confirm Password" />
  </Form.Field>
);

const GroupSection = ({ formConfig, groups }: { formConfig: IFormConfig, groups: any }) => (
  <div className="inline-flex flex-row items-center justify-start gap-x-4">
    <Form.Field {...formConfig.form} name="groups" label="Group">
      <Form.Combobox
        {...(groups)}
      />
    </Form.Field>
  </div>
);

const StatusSection = ({ formConfig }: { formConfig: IFormConfig }) => (
  <Form.Field {...formConfig.form} name="isActive" label="Status">
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
