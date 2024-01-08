import { FC, ReactNode, useMemo } from "react";
import Navbar from "./navbar";
import ThemedSiderV2 from "./sider";
import SidebarMobile from "./sider-mobile";
import { LayoutProps } from "./type";
import { Toaster } from "@src/shadcn/elements/toaster";

export const ThemedLayoutV2: FC<LayoutProps> = ({
  children,
  darkModeProvider,
  defaultDarkMode,
  storageKey,
  Title,
  Footer,
}) => {
  const Container = () => {
    return (
      <>
        <ThemedSiderV2 className="hidden" Title={Title} />
        <div className="bg-white xl:pl-52 dark:bg-black text-foreground">
          <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
            <SidebarMobile>
              <ThemedSiderV2 Title={Title} />
            </SidebarMobile>
            <Navbar darkMode={!!darkModeProvider} />
          </header>
          <main className="relative px-4 space-y-1">
            {children as ReactNode}
          </main>
          {Footer ? (
            <Footer />
          ) : (
            <footer className="h-20 py-2.5 border-t border-border mt-4 flex-none flex flex-row items-center justify-between px-4 text-xs gap-x-4 ">
              <div className="w-full px-4 py-10 mx-auto sm:px-6 lg:px-8">
                <div className="text-center">
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
              </div>
            </footer>
          )}
        </div>
        <Toaster />
      </>
    );
  };

  if (darkModeProvider) {
    const DarkModeProvider = useMemo(() => {
      return darkModeProvider;
    }, [darkModeProvider]);

    return (
      <DarkModeProvider
        defaultDarkMode={defaultDarkMode}
        storageKey={storageKey}
      >
        <Container />
      </DarkModeProvider>
    );
  }

  return <Container />;
};

export { ThemedSiderV2 };
