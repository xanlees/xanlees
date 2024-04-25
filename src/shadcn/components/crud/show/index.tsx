import { DeleteProvider } from "@/shadcn/providers";
import {
    useRefineContext,
    useResource,
    useTranslate,
    useUserFriendlyName,
} from "@refinedev/core";
import { ReactNode } from "react";
import { Card, CardContent } from "../../../elements";
import { ListProps } from "../types";
import { Row } from "./components/row";
import { PageHeader } from "../../pageHeader";
import { Breadcrumb } from "../../breadcrumb";
import { DeleteButton, EditButton } from "../../buttons";

export const Show = ({
    title,
    resource: resourceFromProps,
    breadcrumb: breadcrumbFromProps,
    children,
    showButtonEdit= true
}: ListProps & { showButtonEdit?: boolean}) => {
    const translate = useTranslate();
    const { options: { breadcrumb: globalBreadcrumb } = {} } =
        useRefineContext();

    const getUserFriendlyName = useUserFriendlyName();

    const { resource, identifier } = useResource(resourceFromProps);

    const breadcrumb =
        typeof breadcrumbFromProps === "undefined"
            ? globalBreadcrumb
            : breadcrumbFromProps;

    return (
        <DeleteProvider>
            <PageHeader
                title={
                    title ??
                    translate(
                        `${identifier}.titles.List`,
                        `Show ${getUserFriendlyName(
                            resource?.meta?.label ??
                                resource?.options?.label ??
                                resource?.label ??
                                identifier,
                            "singular",
                        )}`,
                    )
                }
                breadcrumb={
                    typeof breadcrumb !== "undefined" ? (
                        <>{breadcrumb}</> ?? undefined
                    ) : (
                        <Breadcrumb />
                    )
                }
                isBack
                extra={
                    <div className="inline-flex items-center gap-x-2">
                        {showButtonEdit && <EditButton />}
                        <DeleteButton />
                    </div>
                }
            />
            <div className="relative pt-4 !mt-0">
                <Card className="rounded-sm shadow-md">
                    <CardContent>{children as ReactNode}</CardContent>
                </Card>
            </div>
        </DeleteProvider>
    );
};

Show.Row = Row;
