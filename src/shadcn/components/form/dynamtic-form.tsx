import { Button } from "@src/shadcn/elements"
import React, { Children, cloneElement } from "react"

export const DynamicForm = ({ ...props }) => {
    const { fields, append, defaultConfig } = props
    const initialState = defaultConfig? {...defaultConfig}:{}
    return (
        <div>
            {fields.map((_: any, index: React.Key | null | undefined) => {
                return (
                    <div key={index}>
                        <div className="flex gap-x-3"  >
                            {Children.map(props.children, (child) => {
                                return cloneElement(child, { ...child.props, ...props.form, ...{array_name: props.name, array_index: index}});
                            })}
                        </div>
                    </div>
                )
            }
            )}
            <Button
                className="mt-3"
                type="button"
                onClick={() => {
                    append(initialState);
                }}
            >
                {`ເພີ່ມ ${props.label}`}
            </Button>
        </div>

    )
}