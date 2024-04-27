import { useSelect } from "@refinedev/core";
import { Input } from "@src/shadcn/elements";
import { Form } from "@/shadcn/components/form";
import { type IGroup } from "../interface";
import { type IFormConfig } from "@src/common/interface";
import { SwitchButton } from "@src/shadcn/components/form/switch";
import { useUserForm } from "../hook/useUserForm";

export const UserForm = ({ navigates = "profile", profile }: { navigates: string, profile?: number }) => {
  const { form } = useUserForm(profile ?? 0, navigates);
  const groups = useSelect<IGroup>({ resource: "group", optionLabel: "name", optionValue: "name" });
  return (
    <div className=" w-full sm:w-[850px]">
      <Form {...form}>
        <UsernameInput {...form} />
        <div className="flex w-full gap-3 flex-warp">
          <div className="w-1/2"><PasswordInput {...form} /></div>
          <div className="w-1/2"><Password2ndInput {...form} /></div>
        </div>
        <GroupSection form={form} groups={groups} />
        <StatusSection form={form} />
      </Form>
    </div>
  );
};

const UsernameInput = (form: IFormConfig) => (
  <Form.Field {...form} name="username" label="ຊື່ບັນຊີເຂົ້າໃຊ້ງານລະບົບ">
    <Input placeholder="ຊື່ບັນຊີເຂົ້າໃຊ້ງານລະບົບ" />
  </Form.Field>
);

const PasswordInput = (form: IFormConfig) => (
  <Form.Field {...form} name="password" label="ລະລັດຜ່ານ">
    <Input placeholder="ລະລັດຜ່ານ" />
  </Form.Field>
);

const Password2ndInput = (form: IFormConfig) => (
  <Form.Field {...form} name="confirmPassword" label="ຢືນ​ຢັນ​ລະ​ຫັດ">
    <Input placeholder="ຢືນ​ຢັນ​ລະ​ຫັດ" />
  </Form.Field>
);

const GroupSection = ({ form, groups }: { form: IFormConfig, groups: any }) => (
  <div className="inline-flex flex-row items-center justify-start gap-x-4">
    <Form.Field {...form} name="groups" label="ສິດຂອງບັນຊີໃຊ້ງານລະບົບ">
      <Form.Combobox
        {...(groups)}
      />
    </Form.Field>
  </div>
);

const StatusSection: React.FC<{ form: IFormConfig }> = ({ form }) => {
  return (
    <div className="w-full lg:w-80 ">
      <div className="relative w-full mb-3">
        <Form.Field {...form} name={"isActive"} label={"ສະຖານະ"} require={false}>
          <SwitchButton />
        </Form.Field>
      </div>
    </div>
  );
};
