import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Input,
} from "@src/shadcn/elements";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@src/shadcn/elements/form";
import { FileText } from "lucide-react";
import { ChangeEvent, useState } from "react";

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
  const [preview, setPreview] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileName, setFileName] = useState("");
  return (
    <>
      <Input
        type="file"
        {...props.rest}
        onChange={(event) => {
          const { files, displayUrl } = getImageData(event);
          setPreview(displayUrl);
          const fileName = event.target.files![0].name;
          const fileExtension = fileName.split(".").pop();
          setFileType(fileExtension as any);
          setFileName(fileName)

          props.onChange(files);
        }}
      />
      <div className="flex mt-2 text-sm text-gray-500">
        {fileType && <FileText color="#ff0000" />} <span className="mt-1"> {fileName}</span>
      </div>
    </>
  );
};
