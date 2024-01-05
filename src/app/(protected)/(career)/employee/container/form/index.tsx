/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import {
  useSelect,
  type RedirectAction,
  type BaseOption,
} from "@refinedev/core";
import { Input } from "@src/shadcn/elements";
import { Form } from "@/shadcn/components/form";
import { type IProfile } from "../../interface";
import { type IPosition } from "@src/app/(protected)/branch/interface";
import { useFormConfig } from "./config";

interface IFormConfig {
  form: {
    setValue: any
  }
}

export const EmployeeForm = ({
  redirect = "edit",
}: {
  redirect: RedirectAction
}) => {
  const formConfig = useFormConfig(redirect);
  const profile = useSelect<IProfile>({
    resource: "profile",
    optionLabel: "fullname",
    optionValue: "id",
  });
  const options = profile.queryResult.data?.data.map((item) => ({
    label: `${item.fullname} - ${item.nickname}`,
    value: item.id,
  }));
  profile.options = options as BaseOption[];

  const position = useSelect<IPosition>({
    resource: "position",
    optionLabel: "name",
    optionValue: "id",
  });
  return (
    <div className="w-1/5 mx-auto ">
      <Form {...formConfig.form}>
        <div className="flex flex-col w-full gap-3 flex-warp">
          <ProfileSection formConfig={formConfig} profile={profile} />
          <PositionSection formConfig={formConfig} position={position} />
          <div className="flex justify-start ">
            <Form.Field {...formConfig.form} name="isLatest" label="Is Latest">
              <Input
                placeholder="isLatest"
                className="block w-5 h-5 "
                type="checkbox"
                defaultValue={"true"}
              />
            </Form.Field>
          </div>
        </div>
      </Form>
    </div>
  );
};

const PositionSection = ({
  formConfig,
  position,
}: {
  formConfig: IFormConfig
  position: any
}) => (
  <div className="inline-flex flex-row items-center justify-start gap-x-4">
    <Form.Field {...formConfig.form} name="positionId" label="position">
      <Form.Combobox
        {...position}
        onChange={(value) => {
          formConfig.form.setValue("positionId", value);
        }}
      />
    </Form.Field>
  </div>
);

const ProfileSection = ({
  formConfig,
  profile,
}: {
  formConfig: IFormConfig
  profile: any
}) => (
  <div className="inline-flex flex-row items-center justify-start gap-x-4">
    <Form.Field {...formConfig.form} name="profileId" label="profile">
      <Form.Combobox
        {...profile}
        onChange={(value) => {
          formConfig.form.setValue("profileId", value);
        }}
      />
    </Form.Field>
  </div>
);
