import React, { ChangeEvent, useState } from "react";
import { Badge, Input } from "@src/shadcn/elements";
import { FileText } from "lucide-react";
import { cn } from "@src/shadcn/lib/utils";

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const dataTransfer = new DataTransfer();

  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

export const FileInputField = ({ ...props }) => {
  const [fileType, setFileType] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const  { className } = props;
  return (
    <>
      <Input
        type="file"
        className={cn("",className)}
        {...props.rest}
        onChange={(event) => {
          const { files } = getImageData(event);
          const selectedFile = event.target.files![0];

          const fileName = selectedFile.name;
          const fileExtension = fileName.split(".").pop();
          setFileType(fileExtension as any);
          setFileName(fileName);

          const fileSizeInBytes = selectedFile.size;
          const fileSizeInKB = fileSizeInBytes / 1024;
          setFileSize(`${fileSizeInKB.toFixed(2)} KB`);
          props.onChange(event);
        }}
      />
      {fileType && (
  <div className="flex flex-col mt-4 space-y-2 text-sm">
    <div className="flex items-center p-1 bg-blue-100 rounded-md">
      <div className="mr-4">
        <FileText className="w-16 h-16 text-blue-700" />
        <Badge className="flex items-center justify-center text-center rounded-none w-14 mx-1 -my-1.5">
         {fileName.substring(fileName.length - 3, fileName.length)}
        </Badge>
      </div>
      <div className="flex flex-col">
        <div className="emibold text-l">{fileName}</div>
        <div className="text-gray-500">{fileSize}</div>
      </div>
    </div>
  </div>
)}
    </>
  );
};
