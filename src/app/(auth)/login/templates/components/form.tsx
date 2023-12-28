import React from "react";
import Input from "./elements/formInput";
import { useForm } from "@refinedev/react-hook-form";
import {
  type ILoginVariables,
  type TSubmitFunc,
} from "../../interface/interface";
import Password from "./elements/password";

// eslint-disable-next-line @typescript-eslint/naming-convention
const Form = ({ onSubmit }: { onSubmit: TSubmitFunc }) => {
  const { register, handleSubmit } = useForm();
  const onSubmitHandler = handleSubmit((formData) => {
    onSubmit(formData as ILoginVariables);
  });

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="grid gap-y-4">
        <Input
          register={register}
          name="username"
          type="text"
          id="username"
          label="Username"
        />
        <Password register={register} name="password" label="Password" />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white transition-all bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default Form;
