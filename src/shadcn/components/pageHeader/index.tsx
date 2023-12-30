import { FC } from "react";
import { cn } from "../../lib/utils";
import { PageHeaderProps } from "./type";

export const PageHeader: FC<PageHeaderProps> = ({ extra, ...props }) => {
    return (
        <div
            className={cn(
                "flex h-20 items-end lg:justify-between",
                props.className,
            )}
        >
            <div className="flex-1 min-w-0">
                {props.breadcrumb}
                <div className="inline-flex flex-row items-center mt-3 gap-x-4">
                    <div className="inline-flex flex-col">
                        <h2 className="text-2xl font-bold text-black leading-7 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
                            {props.title}
                        </h2>
                        {props.subTitle && (
                            <div className="flex items-center mt-2 text-sm text-gray-300">
                                {props.subTitle}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex lg:ml-4 lg:mt-0">{extra}</div>
        </div>
    );
};
