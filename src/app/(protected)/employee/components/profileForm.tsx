/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
import { Form } from "@ferdiunal/refinedev-shadcn-ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { DatePickerField } from "@src/shadcn/components/form/datepicker";
import { Input } from "@src/shadcn/elements";
import { Upload } from "lucide-react";
import React from "react";

import { genderOptions, maritalStatusOptions } from "../lib/constant";
import { profileSchema } from "../validation/validation";
import { useCounter } from "./context";
import { InputFromLayout } from "./form";

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
    },
    refineCoreProps: {
      resource: "profile",
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
        <DatePickerField {...form} name="birthday" label="Date of Birth" />
        <Form.Field {...form} name="gender" label="Gender">
          <Form.Select options={genderOptions} />
        </Form.Field>
        <Form.Field {...form} name="maritalStatus" label="Marital Status">
          <Form.Select options={maritalStatusOptions} />
        </Form.Field>
        {/* <InputImage /> */}
      </Form>
    </div>
  );
};

export const InputImage: React.FC = () => {
  return (
    <div className="overflow-hidden bg-white rounded-lg w-80">
      <div className="px-4 py-6">
        <div
          id="image-preview"
          className="items-center max-w-sm p-6 mx-auto mb-4 text-center bg-gray-100 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer"
        >
          <input id="upload" type="file" className="hidden" accept="image/*" />
          <label htmlFor="upload" className="cursor-pointer">
            <Upload className="w-8 h-8 mx-auto mb-4 text-gray-700"/>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">
              Upload picture
            </h5>
            <p className="text-sm font-normal text-gray-400 md:px-6">
              Choose photo size should be less than
              <b className="text-gray-600">2mb</b>
            </p>
            <p className="text-sm font-normal text-gray-400 md:px-6">
              and should be in <b className="text-gray-600">JPG, PNG, or GIF</b>
              format.
            </p>
            <span id="filename" className="z-50 text-gray-500 bg-gray-200" />
          </label>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-full">
            <label className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer">
              <span className="ml-2 text-center">Upload</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
