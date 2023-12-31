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

type FormFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & {
    label?: string;
    description?: string;
    children: ReactElement<{
        field: ControllerRenderProps<TFieldValues, TName>;
    }>;
};
export const FormField = (props: FormFieldProps) => {
    return (
        <Field
            control={props.control}
            name={props.name}
            render={({ field }: { field: any }) => {
                return (
                    <FormItem>
                        <div className="flex flex-col gap-2 mt-3">
                            <FormLabel>{props.label}</FormLabel>
                            <FormControl>
                                {cloneElement(props.children, {
                                    ...field,
                                    ...props.children.props,
                                })}
                            </FormControl>
                            {props.description && (
                                <FormDescription>
                                    {props.description}
                                </FormDescription>
                            )}
                            <FormMessage />

                        </div>

                    </FormItem>
                );
            }}
        />
    );
};
