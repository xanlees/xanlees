import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@src/shadcn/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => { setTheme(theme === "light" ? "dark" : "light"); }}
      className="border rounded-md h-9 w-9"
    >
      <Sun className="w-4 h-4 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute w-4 h-4 transition-transform scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
