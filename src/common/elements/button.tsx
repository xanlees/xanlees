import React from "react";
import { Button } from "@src/shadcn/elements";
import { useRouter } from "next/navigation";
import { cn } from "@src/lib/utils";
import { Plus } from "lucide-react";
export function ButtonCreate({
  redirect,
  className,
  disabled = false,
  title,
}: {
  redirect: string
  className?: string
  disabled?: boolean
  title?: string
}): JSX.Element {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push(redirect);
  };
  return (
    <Button
      className={cn("", className)}
      onClick={handleButtonClick}
      disabled={disabled}
    >
      <Plus size="20"/> {title ?? "ເພີ່ມ"}
    </Button>
  );
}

