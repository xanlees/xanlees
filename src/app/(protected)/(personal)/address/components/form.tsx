/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelect, type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Input } from "@src/shadcn/elements";
import { personalAddressSchema } from "../../../(career)/employee/validation/validation";
import { useEmployeeContext } from "../../../(career)/context/context";
import { type IDistrict } from "../../../(career)/employee/interface/interface";
import { Form } from "@src/shadcn/components/form";
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
  const { dispatch } = useEmployeeContext();
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
    filters: [{ field: "pageSize", operator: "eq", value: 140 }],
  });
  return (
    <div className="w-1/2">
      <Form {...form}>
        <div className="flex flex-row w-full gap-x-48">
          <div className="block w-full">
            <Form.Field {...form} name="bornVillage" label="Born Village">
              <Input placeholder="Born Village" />
            </Form.Field>
          </div>
          <div className="w-full">
            <Form.Field {...form} name="currentVillage" label="Current Village">
              <Input placeholder="Current Village" />
            </Form.Field>
          </div>
        </div>
        <div className="flex flex-row w-full gap-x-56">
          <Form.Field {...form} name="bornDistrictId" label="Born District">
            <Form.Combobox
              {...(district as any)}
              onChange={(value) => {
                form.setValue("bornDistrictId", value);
              }}
            />
          </Form.Field>
          <Form.Field
            {...form}
            name="currentDistrictId"
            label="Current District"
          >
            <Form.Combobox
              {...(district as any)}
              onChange={(value) => {
                form.setValue("currentDistrictId", value);
              }}
              className="mx-10"
            />
          </Form.Field>
        </div>
      </Form>
    </div>
  );
};
