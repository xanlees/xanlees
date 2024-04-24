import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Input,
} from "@src/shadcn/elements";
import { cn } from "@src/shadcn/lib/utils";
import { ImagePlus } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const dataTransfer = new DataTransfer();

  if (event.target.files && event.target.files.length > 0) {
    Array?.from(event.target.files).forEach((image) =>
      dataTransfer.items.add(image)
    );

    const files = dataTransfer?.files;
    const displayUrl = URL.createObjectURL(event.target.files[0]);

    return { files, displayUrl };
  }

  return { files: null, displayUrl: "" };
}

interface FileInputImageProps {
  iconImage?: React.ReactNode;
  [key: string]: any;
}

export const FileInputImage = ({
  iconImage,
  label = "ເລືອກຮູບພາບ",
  ...props
}: FileInputImageProps) => {
  const displayImage = props.value ?? "";
  const typeOf = typeof displayImage
  const [preview, setPreview] = useState(displayImage);
  useEffect(() => {
    if (typeOf === "string") {
      setPreview(props.value);
    }
  }, [props.value]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files.length > 0 ? event.target.files[0] : undefined;
    const displayUrl = file ? URL.createObjectURL(file) : "";
    setPreview(displayUrl);
    if (props.onChange && file) {
      props.onChange(file);
    } else if (props.onChange) {
      props.onChange(undefined);
    }
  };
  
  return (
    <div className="grid grid-cols-1 my-4 space-y-4">
      <div className="flex items-center justify-center w-full">
        <label
          className={cn(
            "rounded-full border-4 border-dashed w-full h-60 group text-center hover:border-blue-500 focus-within:border-blue-500 transition-all duration-300 ease-in-out cursor-pointer",
            props.className
          )}
        >
          {preview && (
            <Avatar
              className={cn(
                "h-60 w-60 mx-auto rounded-full overflow-hidden shadow-lg"
              )}
            >
              <AvatarImage
                src={preview}
                alt="Preview image"
                className="object-cover w-full h-full"
              />
              <AvatarFallback>ຮູບພາບ</AvatarFallback>
            </Avatar>
          )}
          {!preview && (
            <div className="flex flex-col items-center justify-center h-full">
              {iconImage ? iconImage : <ImagePlus />}
              <p className="text-sm text-gray-500">
                <span className="text-blue-600 transition-colors duration-200 ease-in-out hover:text-blue-800 focus:text-blue-800">
                  {label ?? "ເລືອກຮູບພາບ"}
                </span>
              </p>
            </div>
          )}
          <Input
            type="file"
            className="hidden"
            {...props.rest}
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
};
