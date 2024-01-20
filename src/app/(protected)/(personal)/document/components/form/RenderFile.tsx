import React from "react";
import { FileText, Trash2 } from "lucide-react";
import { Button } from "@src/shadcn/elements";

interface DocumentFile {
  size: number
  name: string
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
  let fileSize = "ບໍ່ມີຂໍ້ມູນ";
  let fileName = "";
  if (field.documentFile instanceof FileList && field?.documentFile?.length > 0) {
    const selectedFile = field?.documentFile[0];
    const fileSizeInMB = (selectedFile?.size / (bytesToKbConversionFactor * bytesToKbConversionFactor)).toFixed(2);
    fileSize = `${fileSizeInMB} MB`;
    fileName = selectedFile?.name ?? "";
  }
  return (
    <div className="flex items-center justify-between p-4 border rounded-md border-input" key={field.id}>
      <div className="flex items-center">
        <FileText className="w-12 h-12 text-blue-500" />
        <div className="flex flex-col ml-4">
          <div className="text-xl font-semibold text-gray-800">{field?.documentName}</div>
          <div className="text-sm text-blue-500">{`${fileName}:`} <span className="text-black">{fileSize}</span></div>
        </div>
      </div>
      <Button onClick={removeField} className="p-2 bg-red-500 rounded">
        <Trash2 className="w-6 h-6 text-white" />
      </Button>
    </div>
  );
};

export default RenderFile;
