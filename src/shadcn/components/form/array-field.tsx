import React, { Children, cloneElement } from "react"
import { Form } from "@/shadcn/components/form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@src/shadcn/elements";

export const ArrayField = ({ ...props }) => {
    const fieldName = `${props.array_name}.${props.array_index}.${props.name}`
    return (
        <FormField
            key={props.array_index}
            control={props.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem className="flex flex-col ">
                    <FormLabel>{props.label}</FormLabel>
                    <FormControl> 
                        {cloneElement(props.children, {
                            ...field,
                            ...props.children.props
                        })}
                    </FormControl>
                    <FormMessage className="text-red-500 capitalize" />
                </FormItem>
            )}
        />
    )
}