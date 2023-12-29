/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelect, type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Form } from "@ferdiunal/refinedev-shadcn-ui";
import { InputFromLayout } from "./form";
import { Input } from "@/shadcn/ui";
import { personalAddressSchema } from "../validation/validation";
import { useCounter } from "./counterContext";
import { type IDistrict } from "../interface/interface";
interface PersonalAddressFormProps {
  redirect: RedirectAction
}
interface PersonalAddressFormValues {
  bornDistrictId: number
  currentDistrictId: number
  bornVillage: string
  currentVillage: string
  id?: number
}

export const PersonalAddressForm: React.FC<PersonalAddressFormProps> = ({
  redirect,
}) => {
  const { dispatch } = useCounter();
  const { ...form } = useForm<PersonalAddressFormValues>({
    resolver: zodResolver(personalAddressSchema),
    refineCoreProps: {
      resource: "personal_address",
      autoSave: {
        enabled: true,
      },
      redirect,
      onMutationSuccess: (data) => {
        dispatch({ type: "PERSONAL_ADDRESS", payload: data?.data?.id ?? 0 });
      },
    },
    warnWhenUnsavedChanges: true,
  });
  const district = useSelect<IDistrict>({
    resource: "district",
    optionLabel: "districtName",
    optionValue: "id",
  });
  return (
    <div className="w-full">
      <Form {...form}>
        <InputFromLayout>
          <div className="w-full">
            <Form.Field {...form} name="bornVillage" label="Born Village">
              <Input placeholder="Born Village" className="block w-full" />
            </Form.Field>
          </div>
          <div className="w-full">
            <Form.Field {...form} name="currentVillage" label="Current Village">
              <Input placeholder="Current Village" className="block w-full" />
            </Form.Field>
          </div>
        </InputFromLayout>
        <Form.Field {...form} name="bornDistrictId" label="Born District">
          <Form.Combobox
            {...(district as any)}
            onChange={(value) => {
              form.setValue("bornDistrictId", value);
              console.log(value);
            }}
          />
        </Form.Field>
        <Form.Field {...form} name="currentDistrictId" label="Current District">
          <Form.Combobox
            {...(district as any)}
            onChange={(value) => {
              form.setValue("currentDistrictId", value);
            }}
          />
        </Form.Field>
      </Form>
    </div>
  );
};
