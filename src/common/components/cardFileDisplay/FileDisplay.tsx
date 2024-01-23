import React from "react";
import { FileText, Trash2 } from "lucide-react";
import { cn } from "@src/shadcn/lib/utils";
import { Badge, Button } from "@src/shadcn/elements";
interface FileDisplayProps {
  documentName?: string
  className?: string
  onRemove?: () => void
  file?: File
}

const maxFileNameLength = 50;
const bytesToKbConversionFactor = 1024;
const FileDisplay: React.FC<FileDisplayProps> = ({ documentName, className, onRemove, file }) => {
  let fileSize = "ບໍ່ມີຂໍ້ມູນ";
  let fileName = "";
  if (file != null) {
    fileName = file?.name ?? "";
    const fileSizeInMB = (file?.size / (bytesToKbConversionFactor * bytesToKbConversionFactor)).toFixed(2);
    fileSize = `${fileSizeInMB} MB`;
  }
  const fileExtension = fileName.split(".").pop();
  const truncatedFileName = fileName.length > maxFileNameLength ? `${fileName.substring(0, maxFileNameLength)}...` : fileName;
  return (
    <div className={cn("flex items-center justify-between p-4 border rounded-md border-input", className)}>
      <div className="flex items-center">
        <div>
          <FileText className="text-blue-500 w-14 h-14" />
          <Badge className="pl-5 text-center rounded-sm w-14">{fileExtension}</Badge>
        </div>
        <div className="flex flex-col ml-4">
          <div className="text-xl font-semibold text-gray-800">{documentName}</div>
          <div className="text-sm text-blue-500">{`${truncatedFileName}`}</div>
          <div className="text-sm text-black">{`ຂະໜາດໄຟລ: ${fileSize}`}</div>
        </div>
      </div>
      {onRemove !== null && onRemove !== undefined && (
        <Button onClick={onRemove} className="p-2 bg-red-500 rounded">
          <Trash2 className="w-6 h-6 text-white" />
        </Button>
      )}
    </div>
  );
};

export default FileDisplay;
