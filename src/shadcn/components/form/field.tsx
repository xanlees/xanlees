import { ReactElement, cloneElement } from "react";
import {
    ControllerRenderProps,
    FieldPath,
    FieldValues,
    UseControllerProps,
} from "react-hook-form";
import {
    FormField as Field,
    FormControl,
    FormDescription,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../elements";
import { Asterisk } from "lucide-react";
type FormFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & {
    label?: string;
    description?: string;
    require?: boolean;
    children: ReactElement<{
        field: ControllerRenderProps<TFieldValues, TName>;
    }>;
};

export const FormField = ({
    label,
    description,
    children,
    require = true,
    ...rest
  }: FormFieldProps) => {
    return (
      <Field
        {...rest}
        render={({ field }) => (
          <FormItem>
            <div className="flex flex-col">
              <FormLabel className="flex items-center">
                {require && <Asterisk size={15} color="#ff0000" className="mr-1" />}
                {label}
              </FormLabel>
              <FormControl>
                {cloneElement(children, {
                  ...field,
                  ...children.props,
                })}
              </FormControl>
              {description && <FormDescription>{description}</FormDescription>}
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    );
  };