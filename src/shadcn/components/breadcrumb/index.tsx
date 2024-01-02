import {
    matchResourceFromRoute,
    useBreadcrumb,
    useRefineContext,
    useResource,
} from "@refinedev/core";
import { RefineBreadcrumbProps } from "@refinedev/ui-types";
import { FC } from "react";
import { BreadcrumbItems } from "./items";

export type BreadcrumbProps = RefineBreadcrumbProps;

export const Breadcrumb: FC<BreadcrumbProps> = ({
    showHome = true,
    hideIcons = false,
    meta,
}) => {
    const { breadcrumbs } = useBreadcrumb({
        meta,
    });

    const { hasDashboard } = useRefineContext();

    const { resources } = useResource();

    const rootRouteResource = matchResourceFromRoute("/", resources);

    return (
        <BreadcrumbItems 
            breadcrumbs={breadcrumbs}
            hasDashboard={hasDashboard}
            rootRouteResource={rootRouteResource} 
            hideIcons={hideIcons} 
            showHome={showHome}        
        />
    );
};
