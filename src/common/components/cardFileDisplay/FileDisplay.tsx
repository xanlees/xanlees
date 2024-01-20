import React from "react";
import { FileText, Trash2 } from "lucide-react";
import { Button } from "@src/shadcn/elements";
import { cn } from "@src/shadcn/lib/utils";

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
  let fileType = "";
  if (file != null) {
    fileName = file?.name ?? "";
    fileType = file?.type ?? "";
    const fileSizeInMB = (file?.size / (bytesToKbConversionFactor * bytesToKbConversionFactor)).toFixed(2);
    fileSize = `${fileSizeInMB} MB`;
  }

  const truncatedFileName = fileName.length > maxFileNameLength ? `${fileName.substring(0, maxFileNameLength)}...` : fileName;

  console.log("file", file);

  return (
    <div className={cn("flex items-center justify-between p-4 border rounded-md border-input", className)}>
      <div className="flex items-center">
        <FileText className="w-12 h-12 text-blue-500" />
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
