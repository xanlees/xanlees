import React, { useState, useRef } from "react";
import {  Input } from "@src/shadcn/elements"; 
import { cn } from "@src/shadcn/lib/utils";
import FileDisplay from "@src/common/components/cardFileDisplay/FileDisplay";

export const FileInputField = ({ showFileDisplay = true,  ...props}) => {
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
          const selectedFile = event.target.files![0];
          setFile(selectedFile)
          props.onChangeValue(event);
        }}
      />
      {showFileDisplay && file && (
        <FileDisplay
          className={classNameFile}
          file={file}
          onRemove={clearFile}
        />
      )}
    </>
  );
};

