import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Input,
} from "@src/shadcn/elements";
import { cn } from "@src/shadcn/lib/utils";
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

export const FileInputImage = ({ ...props }) => {
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
              <img
                className="max-h-36 mb-4"
                src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                alt="Upload placeholder"
              />
              <p className="text-sm text-gray-500">
                <span className="text-blue-600 hover:text-blue-800 focus:text-blue-800 transition-colors duration-200 ease-in-out">
                ເລືອກຮູບພາຍ
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
