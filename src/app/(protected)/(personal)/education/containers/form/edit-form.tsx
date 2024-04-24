import React from "react";
import { Input } from "@src/shadcn/elements";
import { Form } from "@/shadcn/components/form";
import { useEducationFormEdit } from "../../hook/form/useEducationFormEdit";
import { useGraduationSelect } from "../../hook/form/useGraduationSelect";

export const EducationEditForm: React.FC<{ id: number }> = ({ id }) => {
  const { form } = useEducationFormEdit(id);
  const graduation = useGraduationSelect();
  return (
    <div className="flex justify-center">
      <div className="flex flex-col border rounded-2xl">
        <div className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">
            ຟອມຂໍ້ມູນການສຶກສາ
        </div>
        <Form {...form}>
          <div className="flex gap-x-2">
            <Form.Field {...form} name="branch" label="ສະຖາບັນ">
              <Input placeholder="" className="block w-56" />
            </Form.Field>
            <Form.Field {...form} name="graduationId" label="ພາກວີຊາ">
              <Form.Combobox {...(graduation as any)} />
            </Form.Field>
            <Form.Field {...form} name="year" label="ຈົບສົກປີ">
              <Input placeholder="2018" numericOnly className="block w-full sm:w-28" />
            </Form.Field>
          </div>
        </Form>
      </div>
    </div>
  );
};

