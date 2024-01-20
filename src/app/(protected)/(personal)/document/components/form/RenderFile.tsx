import React from "react";
import { FileText, Trash2 } from "lucide-react";
import { Button } from "@src/shadcn/elements";

interface DocumentFile {
  size: number
}

interface RenderFileProps {
  field: {
    id: string
    documentName?: string
    documentFile?: DocumentFile | FileList
    profileId?: number
  }
  removeField: () => void
}
const bytesToKbConversionFactor = 1024;

const RenderFile: React.FC<RenderFileProps> = ({ field, removeField }) => {
  let fileSize = "NaN";
  if (field.documentFile instanceof FileList && field?.documentFile?.length > 0) {
    const selectedFile = field?.documentFile[0];
    const fileSizeInMB = (selectedFile?.size / (bytesToKbConversionFactor * bytesToKbConversionFactor)).toFixed(2);
    fileSize = `${fileSizeInMB} MB`;
  }
  return (
    <div className="flex justify-between p-2 border rounded-md border-input" key={field.id}>
      <div className="flex items-center">
        <FileText className="w-9 h-9" />
        <div className="flex flex-col ml-2">
          <div className="text-lg">{field?.documentName}</div>
          <div className="text-sm text-blue-500">{`File size: ${fileSize}`}</div>
        </div>
      </div>
      <Button onClick={removeField} className="bg-red-500">
        <Trash2 />
      </Button>
    </div>
  );
};

export default RenderFile;
