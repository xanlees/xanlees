import { Button } from "@src/shadcn/elements"
import { cn } from "@src/shadcn/lib/utils";
import React, { Children, cloneElement } from "react"

export const DynamicForm = ({ ...props }) => {
    const { fields, append, defaultConfig, className, remove, classNameButton } = props
    const initialState = defaultConfig ? { ...defaultConfig } : {}
    return (
        <div>
            {fields.map((_: any, index: React.Key | null | undefined) => {
                return (
                    <div key={index}>
                        <div className={cn("flex gap-1 ",className)} >
                            {Children.map(props?.children, (child) => {
                                return cloneElement(child, { ...child?.props, ...props?.form, ...{ array_name: props.name, array_index: index } });
                            })}
                            <Button
                                className={cn("my-2 bg-red-500",classNameButton)}
                                type="button"
                                onClick={() => {
                                    remove(index);
                                }}
                            >
                                {`ລຶບ`}
                            </Button>
                        </div>
                    </div>
                )
            }
            )}
            <Button
                className={cn(" mt-1.5",className)}
                type="button"
                onClick={() => {
                    append(initialState);
                }}
            >
                {`${props.label}`}
            </Button>
        </div>

    )
}