import { useRouter } from "next/navigation";
import React from "react";
import * as z from "zod";

import { Form } from "@/shadcn/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { DatePickerField } from "@src/shadcn/components/form/datepicker";
import { SwitchButton } from "@src/shadcn/components/form/switch";
import { Input } from "@src/shadcn/elements";
import { type IMessages, type IFormConfig, type ErrorMapMessage } from "@src/common/interface";
import { usePositionSelect } from "../../hook/useSelect";
import { getErrorMessageNotification } from "@src/common/lib/errorNotification";

export const EmployeeEditForm: React.FC<{ id: number, redirectTo: string }> = ({ id, redirectTo }) => {
  const { form } = useEmployeeEdit({ id, redirectTo });
  const position = usePositionSelect();
  return (
    <Form {...form}>
      <div className="flex flex-wrap gap-2">
        <div className="w-full lg:w-80">
          <div className="w-full flex flex-col lg:flex-row lg:gap-x-5">
            <Form.Field {...form} name="positionId" label="ຕໍາແໜ່ງ">
              <Form.Combobox {...(position as any)} className="w-72" />
            </Form.Field>
          </div>
        </div>
        <div className="w-full lg:w-80">
          <div className="w-full flex flex-col lg:flex-row lg:gap-x-5">
            <Form.Field {...form} name="joiningDate" label="ວັນທີ ເດືອນປີ ເຂົ້າວຽກ">
              <DatePickerField className="w-72" />
            </Form.Field>
          </div>
        </div>
        <InputFiled form={form}/>
      </div>
    </Form>
  );
};

const InputFiled: React.FC<{ form: IFormConfig }> = ({ form }) => {
  return (<>
    <div className="w-full lg:w-80">
      <div className="w-full flex flex-col lg:flex-row lg:gap-x-5">
        <Form.Field {...form} name={"salary"} label={"ເງິນເດືອນ"} require={false} >
          <Input placeholder="3,000,000" className="w-72" type="currency" numericOnly/>
        </Form.Field>
      </div>
    </div>
    <div className="w-full lg:w-80">
      <div className="w-full flex flex-col lg:flex-row lg:gap-x-5">
        <Form.Field {...form} name={"isLatest"} label={"ສະຖານະ"} require={false} >
          <SwitchButton activeLabel={"ແມ່ນຕໍາແໜ່ງລ່າ​ສຸດ"} inactiveLabel={"ບໍ່ແມ່ນຕໍາແໜ່ງລ່າ​ສຸດ"} />
        </Form.Field>
      </div>
    </div></>);
};
const useEmployeeEdit = ({ id, redirectTo }: { id: number, redirectTo: string }) => {
  const router = useRouter();
  const { ...form } = useForm<z.infer<typeof graduationSchema>>({
    resolver: zodResolver(graduationSchema),
    defaultValues: {
      branch: "",
      graduationId: 0,
      profileId: 0,
      year: "",
      salary: 0,
    },
    refineCoreProps: {
      resource: "employee",
      redirect: false,
      action: "edit",
      id,
      onMutationSuccess: (data) => {
        router.back();
      },
      errorNotification: (data: any) => {
        const responseData = (data as IMessages).response.data;
        return getErrorMessageNotification({ responseData, errorMessages, defaultMessage: "ຕໍາແໜ່ງລ່າສຸດສາມາດມີໄດ້ຕໍາແໜ່ງດຽວ" });
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};
const errorMessages: ErrorMapMessage[] = [
  { val: "There can only be one 'latest' employee record per profile.", message: "ຕໍາແໜ່ງລ່າສຸດສາມາດມີໄດ້ຕໍາແໜ່ງດຽວ" },
];
const graduationSchema = z
  .object({
    joiningDate: z.union([z.nullable(z.string()), z.date()]),
    isLatest: z.boolean(),
    positionId: z.nullable(z.number()),
    salary: z.union([z.number(), z.string()]).transform((value): number | string => {
      if (typeof value === "string") {
        return value.replace(/,/g, "");
      }
      return value;
    }),
  });
