import { cn } from "@src/shadcn/lib/utils";

export const Row = ({
    title,
    content,
    className,
}: {
    title?: string;
    content?: string | number | JSX.Element;
    className?: string
}) => {
    return (
        <>
            <dl className="flex flex-wrap items-center p-2 pl-6 space-x-2">
                <div className="w-1/2">
                <dt className={cn("text-lg font-semibold tracking-tight scroll-m-20 text-gray-700 dark:text-gray-300", className)}>
                        {title}
                    </dt>
                </div>
                <div>
                <dd className=" text-sm font-normal leading-7 text-foreground italic">
                        {content}
                    </dd>
                </div>
                    
            </dl>
        </>
    );
};
