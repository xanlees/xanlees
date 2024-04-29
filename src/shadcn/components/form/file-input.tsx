import React, { useState, useRef } from "react";
import { Input } from "@src/shadcn/elements";
import { cn } from "@src/shadcn/lib/utils";
import FileDisplay from "@src/common/components/cardFileDisplay/FileDisplay";

export const FileInputField = ({ showFileDisplay = true, accept = "", ...props }) => {
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
        accept={"application/pdf"}
        className={cn("", className)}
        {...props.rest}
        ref={fileInputRef}
        onChange={(event) => {
          if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
            props.onChange(selectedFile);
          } else {
            setFile(undefined);
            props.onChange(undefined);
          }
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
