import React, { ChangeEvent, useState, useRef } from "react";
import {  Input } from "@src/shadcn/elements"; 
import { cn } from "@src/shadcn/lib/utils";
import FileDisplay from "@src/common/components/cardFileDisplay/FileDisplay";

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
  const [file, setFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { className, classNameFile } = props;

  const clearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFile(undefined);
  };

  return (
    <>
      <Input
        type="file"
        className={cn("", className)}
        {...props.rest}
        ref={fileInputRef}
        onChange={(event) => {
          const { files } = getImageData(event);
          const selectedFile = event.target.files![0];
          setFile(selectedFile)
          const fileName = selectedFile.name;
          const fileExtension = fileName.split(".").pop();
          const fileSizeInBytes = selectedFile.size;
          props.onChange(event);
        }}
      />
      {file && (
        <FileDisplay
          className={classNameFile}
          file={file}
          onRemove={clearFile}
        />
      )}
    </>
  );
};

