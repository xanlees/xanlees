import { Button, Card, CardContent, FormUI, Label } from "@src/shadcn/elements";
import {
  type ILoginVariables,
  type TSubmitFunc,
} from "../interface/interface";
import { useFormConfig } from "./config";
import { PasswordInput, UsernameInput } from "@src/common/elements/user-input";

// eslint-disable-next-line @typescript-eslint/naming-convention
const LoginForm = ({ onSubmit }: { onSubmit: TSubmitFunc }) => {
  const formConfig = useFormConfig(false);
  const onSubmitHandler = formConfig.form.handleSubmit((formData) => {
    onSubmit(formData as ILoginVariables);
  });

  return (
    <FormUI {...formConfig.form} >
      <form {...formConfig.form} onSubmit={onSubmitHandler}>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="w-full p-10 text-center">
              <Label className="text-3xl font-bold"> Sign in</Label>
            </div>
            <UsernameInput {...formConfig} />
            <PasswordInput {...formConfig} />
            <Button
              className="justify-center w-full"
              type="submit">
            Sign in
            </Button>
          </CardContent>
        </Card>
      </form>
    </FormUI>
  );
};

export default LoginForm;
