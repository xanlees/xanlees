import { Button, Link } from "@src/shadcn/elements";
import Navbar from "../themedLayoutV2/navbar";
import { DefaultTitle } from "../themedLayoutV2/sider/tittle";
import { LocalFooter } from "../themedLayoutV2/footer/local";
import { LayoutProps } from "../themedLayoutV2/type";
import { FC, useMemo } from "react";
import { Toaster } from "@src/shadcn/elements/toaster";

export const ThemedLayoutV1: FC<LayoutProps &  {showLogin?: boolean}> = ({
    children,
    darkModeProvider,
    defaultDarkMode,
    storageKey,
    showLogin = false,
}) => {
    const Container = () => {
        return (
            <>
                <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
                    <DefaultTitle collapsed={false} />
                    <Navbar darkMode={!!darkModeProvider} />
                    {showLogin &&  <Button>
                        <Link href="/login">Login</Link>
                    </Button>}
                </header>
                {children}
                <LocalFooter />
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
