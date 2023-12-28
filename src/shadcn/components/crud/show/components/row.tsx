export const Row = ({
    title,
    content,
}: {
    title?: string;
    content?: string | number | JSX.Element;
}) => {
    return (
        <>
            <dl className="flex flex-wrap">
                <div className="flex-auto pt-6 pl-6">
                    <dt className="text-lg font-semibold tracking-tight scroll-m-20">
                        {title}
                    </dt>
                    <dd className="mt-1 text-base font-normal leading-7 text-foreground">
                        {content}
                    </dd>
                </div>
            </dl>
        </>
    );
};
