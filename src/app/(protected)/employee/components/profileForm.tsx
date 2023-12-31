/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
import { Form } from "@ferdiunal/refinedev-shadcn-ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { DatePickerField } from "@src/shadcn/components/form/datepicker";
import { Input } from "@src/shadcn/elements";
import React from "react";

import { genderOptions, maritalStatusOptions } from "../lib/constant";
import { profileSchema } from "../validation/validation";
import { useCounter } from "./context";
import InputImage from "./InputImage";

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
    mode: "onChange",
    defaultValues: {
      personalAddressId: state.personalAddressId,
    },
    refineCoreProps: {
      resource: "profile",
      meta: {
        headers: {
          "content-type": "multipart/form-data",
        },
      },
      autoSave: {
        enabled: true,
      },
      onMutationSuccess: (data) => {
        dispatch({ type: "SET_PROFILE_ID", payload: data?.data?.id ?? 0 });
      },
      redirect,
    },
    warnWhenUnsavedChanges: true,
  });
  return (
    <div className="w-2/5 capitalize rounded-lg">
      <Form {...form}>
        <div className="gap-2 sm:flex">
          <div className="w-full">
            <Form.Field {...form} name="fullname" label="fullname">
              <Input placeholder="Fullname" className="w-full" />
            </Form.Field>
          </div>
          <div className="w-full">
            <Form.Field {...form} name="nickname" label="nickname">
              <Input placeholder="Nickname" className="w-full" />
            </Form.Field>
          </div>
        </div>
        <div className="gap-2 sm:flex">
          <div className="w-full">
            <Form.Field {...form} name="phoneNumber" label="Phone Number">
              <Input placeholder="Phone Number" className="w-full " />
            </Form.Field>
          </div>
          <div className="w-full pt-2.5">
            <DatePickerField {...form} name="birthday" label="Date of Birth" />
          </div>
        </div>

        <div className="gap-2 sm:flex">
          <div className="w-full">
            <Form.Field {...form} name="gender" label="Gender" >
              <Form.Select options={genderOptions}/>
            </Form.Field>
          </div>
          <div className="w-full">
            <Form.Field {...form} name="maritalStatus" label="Marital Status">
              <Form.Select options={maritalStatusOptions} />
            </Form.Field>
          </div>
        </div>
        <InputImage label={"Profile"} {...form} name="profilePicture"/>
      </Form>
    </div>
  );
};

