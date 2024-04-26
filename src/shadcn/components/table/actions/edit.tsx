import type { RowActionProps } from ".";
import { RowAction } from ".";
import { useGetEditUrl } from "../../../hooks";

type EditActionProps = RowActionProps & {
    row: any;
    resource: string;
    title: string;
    actionKey?: string;
};

export function EditAction({
    row,
    resource,
    title,
    disabled,
    actionKey,
    ...props
}: EditActionProps) {
    const actionKeyValue = actionKey ? row[actionKey] : row.id;
    const edit = useGetEditUrl(resource, actionKeyValue);
    console.log("actionKeyValue", actionKeyValue)
    console.log("actionKey", actionKey)
    console.log("row", row)
    return (
        <RowAction
            {...props}
            disabled={!edit.can ?? disabled}
            title={!edit?.can ? edit?.reason : title}
            to={edit.url}
        />
    );
}

EditAction.displayName = "EditAction";
