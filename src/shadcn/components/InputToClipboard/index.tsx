"use client";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button, Input } from "@src/shadcn/elements";
import { Copy } from "lucide-react";
import { useNotification } from "@refinedev/core";

export const InputToClipboard = ({ value }: { value: string }) => {
  const { open } = useNotification();
  const onClick = () => open?.({
    type: "success",
    message: "Copy to Clipboard Successfully",
  });
  return <div className="flex flex-row">
    <Input className="text-blue-400 w-72" value={value} readOnly />
    <CopyToClipboard text={value}>
      <Button className="my-2 -mx-2" onClick={onClick}><Copy /></Button>
    </CopyToClipboard>
  </div>;
};
