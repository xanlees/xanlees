import React, { ChangeEvent, useState } from "react";
import { Input } from "@src/shadcn/elements";
import { FileText } from "lucide-react";

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
  return (
    <>
      <Input
        type="file"
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
          props.onChange(files);
        }}
      />
      <div className="flex h-12 mt-2 text-sm ">
        {fileType && (
          <div className="flex w-full pt-2 pl-2 bg-blue-300 rounded-md">
            <div className="mr-2">
              <FileText className="w-9 h-9" />
            </div>
            <div className="flex flex-col">
              <div className="text-md">{fileName}</div>
              <div className="text-sm">{fileSize}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
