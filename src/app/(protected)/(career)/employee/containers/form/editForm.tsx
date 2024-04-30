import React from "react";
import { Form } from "@/shadcn/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import * as z from "zod";
import { usePositionSelect } from "../../hook/useSelect";
import { DatePickerField } from "@src/shadcn/components/form/datepicker";
import { SwitchButton } from "@src/shadcn/components/form/switch";
import { useRouter } from "next/navigation";

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
        <div className="w-full lg:w-80">
          <div className="w-full flex flex-col lg:flex-row lg:gap-x-5">
            <Form.Field {...form} name={"isLatest"} label={"ສະຖານະ"} require={false} >
              <SwitchButton activeLabel={"ແມ່ນຕໍາແໜ່ງລ່າ​ສຸດ"} inactiveLabel={"ບໍ່ແມ່ນຕໍາແໜ່ງລ່າ​ສຸດ"} />
            </Form.Field>
          </div>
        </div>
      </div>
    </Form>
  );
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
    },
    refineCoreProps: {
      resource: "employee",
      redirect: false,
      action: "edit",
      id,
      onMutationSuccess: (data) => {
        router.back();
      },
    },
    warnWhenUnsavedChanges: true,
  });
  return { form };
};

const graduationSchema = z
  .object({
    joiningDate: z.union([z.nullable(z.string()), z.date()]),
    isLatest: z.boolean(),
    positionId: z.nullable(z.number()),
  });

