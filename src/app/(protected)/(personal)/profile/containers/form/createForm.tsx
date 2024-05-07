
import React from "react";
import { Form } from "@src/shadcn/components/form";
import { FormFieldContainer } from "./FormFieldContainer";
import { useProfileCreateForm } from "../../hooks/form/useProfileCreateForm";

export const ProfileCreateForm: React.FC<{ user: number, userProfile: number }> = ({ user, userProfile }) => {
  const { form } = useProfileCreateForm({ user, userProfile });
  return (
    <Form {...form}>
      <FormFieldContainer form={{ form }} isEmployee={false} />
    </Form>
  );
};

