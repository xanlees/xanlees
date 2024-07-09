import React from "react";
import { Table } from "@/shadcn/components/table";
import { ImageDialogProps } from "@src/shadcn/elements";

interface ImageActionProps extends Omit<ImageDialogProps, 'src'> {
  row: any;
  accessorKey?: string;
  icon?: React.ReactNode;

}

export function TableImage({
  row,
  accessorKey = "image",
  icon,
  ...props
}: ImageActionProps) {
  const imageUrl = row ? row[accessorKey] : "";
  return (
    <Table.Image
      {...props}
      src={imageUrl}
      icon={icon}
    />
  );
}

TableImage.displayName = "TableImage";
