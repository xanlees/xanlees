import Navbar from "./navbar";
import SidebarMobile from "./sider-mobile";
import ThemedSiderV2 from "./sider";
import { FC, ReactNode, useMemo } from "react";
import { LayoutProps } from "./type";
import { Toaster } from "@src/shadcn/elements/toaster";
import { LocalFooter } from "./footer/local";

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
        <div className="hidden xl:block"><ThemedSiderV2 className="hidden" Title={Title} /></div>
        <div className="bg-white xl:pl-52 dark:bg-black text-foreground">
          <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
            <SidebarMobile>
              <ThemedSiderV2 shownBorder={false} Title={Title} />
            </SidebarMobile>
            <Navbar darkMode={!!darkModeProvider}/>
          </header>
          <main className="relative px-4 space-y-1 overflow-y-auto mb-44">
            {children as ReactNode}
          </main>
          {Footer ? (
            <Footer />
          ) : (
            <LocalFooter/>
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


