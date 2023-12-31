/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Input } from "@src/shadcn/elements";
import React from "react";

import { genderOptions, maritalStatusOptions } from "../lib/constant";
import { profileSchema } from "../validation/validation";
import { useCounter } from "./context";
import { Form } from "@src/shadcn/components/form";

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
    <div className="w-[39%] rounded-full ">
      <Form {...form}>
        <div className="flex flex-col w-full capitalize rounded-lg sm:w-1/2 sm:flex-row">
          <div className="flex-1 p-4">
            <Form.Field {...form} name="fullname" label="fullname">
              <Input placeholder="Fullname" />
            </Form.Field>
            <Form.Field {...form} name="phoneNumber" label="Phone Number">
              <Input placeholder="Phone Number" />
            </Form.Field>
            <Form.Field {...form} name="gender" label="Gender">
              <Form.Select options={genderOptions} />
            </Form.Field>
            <Form.FileInput label={"Profile"} {...form} name="profilePicture" />
          </div>
          <div className="flex-1 p-4 ">
            <Form.Field {...form} name="nickname" label="nickname">
              <Input placeholder="Nickname" />
            </Form.Field>
            <Form.DatePicker {...form} name="birthday" label="Date of Birth" />
            <Form.Field {...form} name="maritalStatus" label="Marital Status">
              <Form.Select options={maritalStatusOptions} />
            </Form.Field>
          </div>
        </div>
      </Form>
    </div>
  );
};
