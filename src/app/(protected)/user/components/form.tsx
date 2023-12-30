/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelect, type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import type * as z from "zod";
import { Input } from "@/shadcn/ui";
import { Form } from "@/shadcn/components/form";
import { type IGroup } from "../interface";
import { userSchema } from "../validation/validation";

export const UserForm = ({
  redirect = "edit",
}: {
  redirect: RedirectAction
}) => {
  const { ...form } = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      isActive: false,
      groups: [],
    },
    refineCoreProps: {
      autoSave: {
        enabled: true,
      },
      redirect,
    },
    warnWhenUnsavedChanges: true,
  });

  const groups = useSelect<IGroup>({
    resource: "group",
    optionLabel: "name",
    optionValue: "name",
  });

  return (
    <Form {...form}>
      <Form.Field {...form} name="username" label="Username">
        <Input placeholder="Username" />
      </Form.Field>
      <Form.Field {...form} name="password" label="Password">
        <Input placeholder="Password" />
      </Form.Field>
      <div className="inline-flex flex-row items-center justify-start gap-x-4">
        <Form.Field {...form} name="groups" label="Group">
          <Form.Combobox
            {...(groups as any)}
            onChange={(value) => {
              form.setValue("groups", [value]);
            }}
          />
        </Form.Field>
        <Form.Field {...form} name="isActive" label="Status">
          <Form.Select
            options={userStatus}
          />
        </Form.Field>
      </div>
    </Form>
  );
};

const userStatus = [
  {
    label: "ເປີດໃຊ້ງານ",
    value: "true",
  },
  {
    label: "ປີດໃຊ້ງານ",
    value: "false",
  },
];
