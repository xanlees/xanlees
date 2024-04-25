import { cn } from "@src/lib/utils";

export const Row = ({
    title,
    content,
    icon,
    className,
  }: {
    title?: string;
    content?: string | number | JSX.Element;
    icon?: JSX.Element;
    className?: string;
  }) => {
    return (
      <dl className="flex flex-wrap items-center pt-2 pl-6 space-x-2">
        <div className="w-1/2 flex items-center">
          {icon && <div className="mr-2 text-lg">{icon}</div>}
          <dt className={cn("text-lg font-semibold tracking-tight scroll-m-20", className)}>
            {title}
          </dt>
        </div>
        <div>
          <dd className="mt-1 text-base font-normal leading-7 text-foreground">
            {content}
          </dd>
        </div>
      </dl>
    );
  };