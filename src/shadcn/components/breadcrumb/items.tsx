import { Action, IResourceItem } from "@refinedev/core";
import { Link } from "@src/shadcn/elements";
import { HomeIcon } from "lucide-react";
import React from "react";

interface BreadcrumbItemsProps {
    breadcrumbs: { label: string; href?: string }[];
    hideIcons?: boolean;
    showHome?: boolean,
    hasDashboard?:  boolean
    rootRouteResource?:  {
        found: boolean;
        resource?: IResourceItem;
        action?: Action;
        matchedRoute?: string;
    } | undefined,
}

export const BreadcrumbItems: React.FC<BreadcrumbItemsProps> = ({
    breadcrumbs,
    hideIcons = false,
    showHome= true,
    hasDashboard = false,
    rootRouteResource = undefined,
}) => {
    const Icon = () => {
        if (hideIcons) {
            return null;
        }

        return (
            <svg
                className="flex-shrink-0 w-5 h-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
            >
                <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                />
            </svg>
        );
    };

    const breadCrumbItems = breadcrumbs.map(({ label, href }, key) => (
        <li key={key}>
            <div className="flex items-center">
                {Icon()}
                {href ? (
                    <Link
                        to={href}
                        title={label}
                        className="ml-4 text-sm font-medium"
                    >
                        {label}
                    </Link>
                ) : (
                    <span className="ml-4">{label}</span>
                )}
            </div>
        </li>
    ));

    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-4">
                {showHome || hasDashboard || rootRouteResource?.found ? (
                    <li>
                        <div>
                            <Link to="/" title="Home">
                                {rootRouteResource?.resource?.meta?.icon ?? (
                                    <HomeIcon size={16} />
                                )}
                                <span className="sr-only">Home</span>
                            </Link>
                        </div>
                    </li>
                ) : null}
                {breadCrumbItems}
            </ol>
        </nav>
    );

}