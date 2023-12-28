/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Form } from "@ferdiunal/refinedev-shadcn-ui";
import type * as z from "zod";
import { InputFromLayout } from "./form";
import { Input } from "@/shadcn/ui";
import { profileSchema } from "../validation/validation";
interface ProfileFormProps {
  redirect: RedirectAction
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ redirect }) => {
  const { ...form } = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      personalAddressId: 1,
      birthday: "2023-12-28T18:46:30.879Z",
    },
    refineCoreProps: {
      resource: "profile",
      autoSave: {
        enabled: true,
      },
      redirect,
    },
    warnWhenUnsavedChanges: true,
  });
  return (
    <div className="w-full">
      <Form {...form}>
        <InputFromLayout>
          <div className="w-full">
            <Form.Field {...form} name="fullname" label="fullname">
              <Input placeholder="fullname" className="block w-full" />
            </Form.Field>
          </div>
          <div className="w-full">
            <Form.Field {...form} name="nickname" label="nickname">
              <Input placeholder="nickname" className="block w-full" />
            </Form.Field>
          </div>
        </InputFromLayout>
        <div className="w-full">
          <Form.Field {...form} name="phoneNumber" label="phoneNumber">
            <Input placeholder="phoneNumber" className="block w-full" />
          </Form.Field>
        </div>
        <Form.Field {...form} name="gender" label="Gender">
          <Form.Select
            options={[
              {
                label: "ຊາຍ",
                value: "MALE",
              },
              {
                label: "ຍິງ",
                value: "FEMALE",
              },
              {
                label: "ອື່ນໆ",
                value: "OTHER",
              },
            ]}
          />
        </Form.Field>
        <Form.Field {...form} name="maritalStatus" label="Marital Status">
          <Form.Select
            options={[
              {
                label: "SINGLE",
                value: "SINGLE",
              },
              {
                label: "MARRIED",
                value: "MARRIED",
              },
              {
                label: "DIVORCED",
                value: "DIVORCED",
              },
              {
                label: "WIDOWED",
                value: "WIDOWED",
              },
            ]}
          />
        </Form.Field>
      </Form>
    </div>
  );
};
