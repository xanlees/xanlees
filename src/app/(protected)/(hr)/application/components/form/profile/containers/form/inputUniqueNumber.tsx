/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { Input } from "@src/shadcn/elements";
import { Form } from "@src/shadcn/components/form";
interface IFormConfig {
  form: {
    control: any
    setValue: any
    watch: any
  }
}
export const UniqueNumberInput: React.FC<{ formConfig: IFormConfig }> = ({
  formConfig,
}) => {
  const type: string | undefined = formConfig.form.watch("typeOfUniqueNumber");
  const classNames = type != null ? "cursor-pointer" : "pointer-events-none";
  const displayText = getTypeDisplayText(type);
  return (
    <div className={classNames}>
      <Form.Field {...formConfig.form} name="uniqueNumber" label={displayText}>
        <Input
          placeholder={displayText}
          className="w-64"
        />
      </Form.Field>
    </div>
  );
};

const getTypeDisplayText = (type: string | undefined): string => {
  if (type === "IDENTIFY") {
    return "ເລກບັດປະຈໍາຕົວ";
  } else if (type === "CENSUS_BOOK") {
    return "ປື້ມສໍາມະໂມຄົວເລກທີ";
  }
  return "ເລກບັດປະຈໍາຕົວ";
};
