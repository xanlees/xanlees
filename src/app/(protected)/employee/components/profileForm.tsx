/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Form } from "@ferdiunal/refinedev-shadcn-ui";
import { InputFromLayout } from "./form";
import { Input } from "@src/shadcn/elements";
import { profileSchema } from "../validation/validation";
import { genderOptions, maritalStatusOptions } from "../lib/constant";
import { useCounter } from "./context";
import { DatePickerField } from "@src/shadcn/components/form/datepicker";
interface ProfileFormProps {
  redirect: RedirectAction
}
interface ProfileFormValues {
  fullname: string
  nickname: string
  phoneNumber: string
  gender: string
  maritalStatus: string
  id?: number
}
export const ProfileForm: React.FC<ProfileFormProps> = ({ redirect }) => {
  const { state, dispatch } = useCounter();
  const { ...form } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      personalAddressId: state.personalAddressId,
      birthday: "2023-12-28T18:46:30.879Z",
    },
    refineCoreProps: {
      resource: "profile",
      autoSave: {
        enabled: true,
      },
      onMutationSuccess: (data, variables) => {
        dispatch({ type: "SET_PROFILE_ID", payload: data?.data?.id ?? 0 });
      },
      redirect,
    },
    warnWhenUnsavedChanges: true,
  });
  return (
    <div className="w-2/3">
      <Form {...form}>
        <InputFromLayout>
          <div className="w-full">
            <Form.Field {...form} name="fullname" label="fullname">
              <Input placeholder="fullname" className="block w-2/3" />
            </Form.Field>
          </div>
          <div className="w-full">
            <Form.Field {...form} name="nickname" label="nickname">
              <Input placeholder="nickname" className="block w-2/3" />
            </Form.Field>
          </div>
        </InputFromLayout>
        <div className="w-full">
          <Form.Field {...form} name="phoneNumber" label="Phone Number">
            <Input placeholder="phoneNumber" className="block w-1/3" />
          </Form.Field>
        </div>
        <DatePickerField {...form} name="birthday" label="Date of Birth"/>
        <Form.Field {...form} name="gender" label="Gender">
          <Form.Select options={genderOptions} />
        </Form.Field>
        <Form.Field {...form} name="maritalStatus" label="Marital Status">
          <Form.Select options={maritalStatusOptions} />
        </Form.Field>
      </Form>
    </div>
  );
};

