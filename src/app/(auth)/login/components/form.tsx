import { Button, Card, CardContent, FormUI, Label } from "@src/shadcn/elements";
import {
  type ILoginVariables,
  type TSubmitFunc,
} from "../interface/interface";
import { useFormConfig } from "./config";
import { PasswordInput, UsernameInput } from "@src/common/elements/input/user";

const LoginForm = ({ onSubmit }: { onSubmit: TSubmitFunc }) => {
  const formConfig = useFormConfig(false);
  const onSubmitHandler = formConfig.form.handleSubmit((formData) => {
    onSubmit(formData as ILoginVariables);
  });

  return (
    <FormUI {...formConfig.form} >
      <form {...formConfig.form} onSubmit={onSubmitHandler}>
        <Card className="rounded-lg ">
          <CardContent className="pt-6 space-y-4">
            <div className="w-full p-10 text-center">
              <Label className="text-3xl font-bold">ເຂົ້າສູ່ລະບົບ</Label>
            </div>
            <UsernameInput {...formConfig} />
            <PasswordInput {...formConfig} />
            <Button
              className="justify-center w-full"
              type="submit">
            ເຂົ້າສູ່ລະບົບ
            </Button>
          </CardContent>
        </Card>
      </form>
    </FormUI>
  );
};

export default LoginForm;
