import { FC } from "react";

export const LocalFooter: FC = () => {
  return (<footer className="fixed bottom-0 w-full sm:h-20 lg:h-24 py-2.5 border-t border-border bg-white dark:bg-black text-xs flex flex-col sm:flex-row items-center justify-between px-4 gap-x-4  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="content-center justify-center pr-20 mx-auto text-center ">
      <div>
        <a
          className="flex-none text-xl font-semibold text-black dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          href="#"
          aria-label="Brand"
        >
          Workhub Link
        </a>
      </div>
      <div className="">
        <p className="text-gray-500">
          Proud partner of
          <a
            className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400"
            href="https://bestech.la"
          >
            {` besTech `}
          </a>
          team.
        </p>
        <p className="text-gray-500">
          © SBS. 2024 Workhub Link Webapp. All rights reserved.
        </p>
      </div>
    </div>
  </footer>);
};
