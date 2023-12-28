/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-lines-per-function */
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelect, type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import * as z from "zod";
import { Input } from "@/shadcn/ui";
import { Form } from "@/shadcn/components/form";
import { type IGroup } from "../interface";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  isActive: z.union([z.string(), z.boolean()]),
  groups: z.array(z.string()),
});

// eslint-disable-next-line @typescript-eslint/naming-convention
export const UserForm = ({
  redirect = "edit",
}: {
  redirect: RedirectAction
}) => {
  const { ...form } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
    <>
      <Form {...form}>
        <Form.Field {...form} name="username" label="Username">
          <Input placeholder="Username" />
        </Form.Field>
        <div className="inline-flex flex-row items-center justify-start gap-x-4">
          <Form.Field {...form} name="groups" label="Group">
            <Form.Combobox {...groups as any}
              onChange={(value) => {
                form.setValue("groups", [value]);
              }}
            />
          </Form.Field>
          <Form.Field {...form} name="isActive" label="Status">
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
            />
          </Form.Field>
        </div>
      </Form>
    </>
  );
};
