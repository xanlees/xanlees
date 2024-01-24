import {
    useRefineContext,
    useResource,
    useTranslate,
    useUserFriendlyName,
} from "@refinedev/core";
import { FC, ReactNode } from "react";
import { ListProps } from "../types";
import { DeleteProvider } from "../../../providers";
import { PageHeader } from "../../pageHeader";
import { Breadcrumb } from "../../breadcrumb";
import { CreateButton } from "../../buttons";

export const List: FC<ListProps & { showCreate?: boolean }> = ({
    title,
    resource: resourceFromProps,
    breadcrumb: breadcrumbFromProps,
    showCreate = true,
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
                        `ລາຍການ ${getUserFriendlyName(
                            resource?.meta?.label ??
                                resource?.options?.label ??
                                resource?.label ??
                                identifier,
                            "plural",
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
                extra={
                    <>
                        <div className="inline-flex flex-row gap-4">
                            {showCreate && <CreateButton />}
                        </div>
                    </>
                }
            />
            <DeleteProvider>
                <div className="relative pt-2 sm:pt-4 !mt-0">
                    {children as ReactNode}
                </div>
            </DeleteProvider>
        </>
    );
};
