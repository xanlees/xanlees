import { FC } from "react";
import { Link } from "../../../../elements";
import { RefineLayoutTitleProps } from "@refinedev/ui-types";
import Image from "next/image";

const defaultIcon = (
    <Image src={"/logo.png"} alt={"SBS logo"} width={46} height={25} className="-mt-1 rounded-full" />
);
export const DefaultTitle: FC<RefineLayoutTitleProps> = () => {
    return (
        <Link
            href="/"
            title={"Workhub Link"}
            className="inline-flex flex-row items-center text-foreground"
        >
            {defaultIcon}
            <span className="ml-2.5 text-xl font-bold">{"Workhub Link"}</span>
        </Link>
    );
};
