import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Input,
} from "@src/shadcn/elements";
import { cn } from "@src/shadcn/lib/utils";
import { ImagePlus } from "lucide-react";
import { ChangeEvent, useState } from "react";

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const dataTransfer = new DataTransfer();
  
  if (event.target.files && event.target.files.length > 0) {
    Array.from(event.target.files).forEach((image) =>
      dataTransfer.items.add(image)
    );
  
    const files = dataTransfer.files;
    const displayUrl = URL.createObjectURL(event.target.files[0]);
  
    return { files, displayUrl };
  }
  
  return { files: null, displayUrl: "" };
}


interface FileInputImageProps {
  iconImage?: React.ReactNode;
  
  [key: string]: any;
}

export const FileInputImage = ({ iconImage, label = "ເລືອກຮູບພາບ", ...props }: FileInputImageProps) => {
  const [preview, setPreview] = useState("");
  return (
    <div className="grid grid-cols-1 space-y-4 my-4">
      <div className="flex items-center justify-center w-full">
        <label className={cn(" rounded-lg border-4 border-dashed w-full h-60 group text-center  hover:border-blue-500 focus-within:border-blue-500 transition-all duration-300 ease-in-out cursor-pointer", props.className)}>
          {preview && (
            <Avatar className={cn("h-48 w-48 mx-auto rounded-lg overflow-hidden shadow-lg", props.className)}>
              <AvatarImage
                src={preview}
                alt="Preview image"
                className="object-cover"
              />
              <AvatarFallback>Image Preview</AvatarFallback>
            </Avatar>
          )}
          {!preview && (
            <div className="flex flex-col items-center justify-center h-full">
              {iconImage ? (
                iconImage
              ) : (
                <ImagePlus />
              )}
              <p className="text-sm text-gray-500">
                <span className="text-blue-600 hover:text-blue-800 focus:text-blue-800 transition-colors duration-200 ease-in-out">
                {label ?? "ເລືອກຮູບພາບ" }
                </span>
              </p>
            </div>
          )}
          <input
            type="file"
            className="hidden"
            {...props.rest}
            onChange={(event) => {
              const { files, displayUrl } = getImageData(event);
              setPreview(displayUrl);
              props.onChange(files);
            }}
          />
        </label>
      </div>
    </div>
  );
};
