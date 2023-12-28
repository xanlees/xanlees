/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelect, type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Form } from "@ferdiunal/refinedev-shadcn-ui";
import * as z from "zod";
import { InputFromLayout } from "./form";
import { Input } from "@/shadcn/ui";
import SelectScrollable from "./districtSelect";
import { type IDistrict } from "../interface";
import { useWatch } from "react-hook-form";

interface PersonalAddressFormProps {
  redirect: RedirectAction
}

const personalAddressSchema = z.object({
  bornVillage: z.string().min(2, {
    message: "Born Village must be at least 2 characters.",
  }),
  currentVillage: z.string().min(2, {
    message: "Current Village must be at least 2 characters.",
  }),
  // bornDistrictId: z.number().min(1, {
  //   message: "Please select a valid Birth District.",
  // }),
  // currentDistrictId: z.number().min(1, {
  //   message: "Please select a valid Current District.",
  // }),
});

export const PersonalAddressForm: React.FC<PersonalAddressFormProps> = ({
  redirect,
}) => {
  const { ...form } = useForm<z.infer<typeof personalAddressSchema>>({
    resolver: zodResolver(personalAddressSchema),
    defaultValues: {
      bornDistrictId: 1,
      currentDistrictId: 2,
    },
    refineCoreProps: {
      resource: "personal_address",
      autoSave: {
        enabled: true,
      },
      redirect,
    },
    warnWhenUnsavedChanges: true,
  });
  const address = useSelect<IDistrict>({
    resource: "district",
    optionLabel: "districtName",
    optionValue: "id",
  });
  const bornDistrictId = useWatch({ name: "bornDistrictId", control: form.control });
  const currentDistrictId = useWatch({ name: "currentDistrictId", control: form.control });

  console.log(bornDistrictId);
  console.log(currentDistrictId);
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
        <div className="w-full">
          <Form.Field {...form} name="bornDistrictId" label="bornDistrictId">
            <Input placeholder="bornDistrictId" className="block w-full" />
          </Form.Field>
        </div>
        <div className="w-full">
          <Form.Field {...form} name="currentDistrictId" label="currentDistrictId">
            <Input placeholder="currentDistrictId" className="block w-full" type="number" />
          </Form.Field>
        </div>
        {/* <InputFromLayout>
          <div className="w-full">
            <Form.Field {...form} name="bornDistrictId" label="Birth District">
              <div className="w-full">
                <Form.Combobox
                  {...(address as any)}
                  className="w-full"
                  onChange={handleBornDistrictChange}
                />
              </div>
            </Form.Field>
          </div>
          <div className="w-full">
            <Form.Field
              {...form}
              name="currentDistrictId"
              label="Current District"
            >
              <Form.Combobox
                className="w-10"
                {...(address as any)}
                onChange={handleCurrentDistrictChange}
              />
            </Form.Field>
          </div>
        </InputFromLayout> */}
        {/* <InputFromLayout>
          <div className="w-full">
            <Form.Field {...form} name="bornDistrictId" label="Birth District">
              <div style={{ width: "100%" }}>
                <SelectScrollable
                  onSelect={(selectedValue) => {
                    form.setValue("bornDistrictId", [selectedValue]);
                  }}
                />
              </div>
            </Form.Field>
          </div>
          <div className="w-full">
            <Form.Field
              {...form}
              name="currentDistrictId"
              label="Current District"
            >
              <div style={{ width: "100%" }}>
                <SelectScrollable
                  onSelect={(selectedValue) => {
                    form.setValue("currentDistrictId", [selectedValue]);
                  }}
                />
              </div>
            </Form.Field>
          </div>
        </InputFromLayout> */}
      </Form>
    </div>
  );
};
