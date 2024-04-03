import {
    useRefineContext,
    useResource,
    useTranslate,
    useUserFriendlyName,
} from "@refinedev/core";
import React, { ReactNode } from "react";
import { ListProps } from "../types";
import { PageHeader } from "../../pageHeader";
import { Breadcrumb } from "../../breadcrumb";
import { ListButton } from "../../buttons";

export const Create: React.FC<ListProps> = ({
    title,
    resource: resourceFromProps,
    breadcrumb: breadcrumbFromProps,
    children,
}) => {
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
        <>
            <PageHeader
                title={
                    title ??
                    translate(
                        `${identifier}.titles.List`,
                        `${getUserFriendlyName(
                            resource?.meta?.label ??
                                resource?.options?.label ??
                                resource?.label ??
                                identifier,
                            "singular",
                        )}`,
                    )
                }
                isBack
                breadcrumb={
                    typeof breadcrumb !== "undefined" ? (
                        <>{breadcrumb}</> ?? undefined
                    ) : (
                        <Breadcrumb />
                    )
                }
                extra={
                    <>
                        <ListButton resource={resourceFromProps}/>
                    </>
                }
            />
            <div className="relative pt-4 !mt-0">{children as ReactNode}</div>
        </>
    );
};
