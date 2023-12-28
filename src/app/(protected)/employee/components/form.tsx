/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-lines-per-function */
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelect, type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import * as z from "zod";
import { Button, Calendar, FormControl, Input } from "@/shadcn/ui";
import { Form } from "@/shadcn/components/form";
import { type IAddress } from "../interface";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@src/shadcn/ui/popover";
import { cn } from "@src/lib/utils";
import { CalendarIcon } from "lucide-react";
import { DatePickerForm } from "./datePicker";

const formSchema = z.object({
  // username: z.string().min(2, {
  //   message: "Username must be at least 2 characters.",
  // }),
  // isActive: z.union([z.string(), z.boolean()]),
  // birthAddress: z.array(z.string()),
  // currentAddress: z.array(z.string()),
});

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EmployeeForm = ({
  redirect = "edit",
}: {
  redirect: RedirectAction;
}) => {
  const { ...form } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      academicYear: new Date(),
      birthAddress: "",
      currentAddress: "",
    },
    refineCoreProps: {
      autoSave: {
        enabled: true,
      },
      redirect,
    },
    warnWhenUnsavedChanges: true,
  });
  const address = useSelect<IAddress>({
    resource: "address",
    optionLabel: "districtName",
    optionValue: "id",
  });

  return (
    <>
      {/* <DatePickerForm />          */}

      <Form {...form}>
        <InputFromLayout>
          <div className="w-full">
            <Form.Field {...form} name="firstName" label="First Name">
              <Input placeholder="First Name" className="block w-full" />
            </Form.Field>
          </div>
          <div className="w-full">
            <Form.Field {...form} name="lastName" label="Last Name">
              <Input placeholder="Last Name" className="block w-full" />
            </Form.Field>
          </div>
        </InputFromLayout>
        <InputFromLayout>
          <div className="w-full"></div>
          <div className="w-full">
            <Form.Field {...form} name="villageCurrent" label="Village Born">
              <Input placeholder="Village Born" className="block w-full" />
            </Form.Field>
          </div>
        </InputFromLayout>
        <InputFromLayout>
          <div className="w-full">
            <Form.Field {...form} name="birthAddress" label="Birth District">
              <div className="w-full">
                <Form.Combobox
                  {...(address as any)}
                  className="w-full"
                  onChange={(value) => {
                    form.setValue("birthAddress", [value]);
                  }}
                />
              </div>
            </Form.Field>
          </div>
          <div className="w-full">
            <Form.Field
              {...form}
              name="currentAddress"
              label="Current District"
            >
              <Form.Combobox
                className="w-10"
                {...(address as any)}
                onChange={(value) => {
                  form.setValue("currentAddress", [value]);
                }}
              />
            </Form.Field>
          </div>
        </InputFromLayout>
        <InputFromLayout>
          <div className="w-full">
            <Form.Field {...form} name="villageBorn" label="Village Born">
              <Input placeholder="Village Born" className="block w-full" />
            </Form.Field>
          </div>
          <div className="w-full">
            <Form.Field {...form} name="villageCurrent" label="Current Village">
              <Input placeholder="Current Village" className="block w-full" />
            </Form.Field>
          </div>
        </InputFromLayout>
      </Form>
    </>
  );
};

export const InputFromLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="sm:col-span-9">
      <div className="gap-2 sm:flex">{children}</div>
    </div>
  );
};
