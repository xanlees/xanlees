import React from "react";
import { Form } from "@src/shadcn/components/form";
import { usePersonalAddressEditForm } from "../hook/usePersonalAddressEditForm";
import { District, Province, Village } from "./form";

export function PersonalAddressCreateForm({ status }: { status: boolean }) {
  const { form } = usePersonalAddressEditForm({ id });
  const village = (form.watch != null) ? form.watch("status") as string : "";
  return (
    <div className="flex justify-center">
      <div className="flex flex-col border rounded-2xl">
        <div className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">
          {`ຟອມຂໍ້ມູນ${village}`}
        </div>
        <div className="rounded-full w-72 sm:w-[710px]">
          <Form {...form}>
            <div className="flex flex-wrap gap-2">
              <Village form={form } title={village} />
              <Province form={ form } />
              <District form={form } />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
