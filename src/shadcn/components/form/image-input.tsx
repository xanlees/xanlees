import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Input,
} from "@src/shadcn/elements";
import { ChangeEvent, useState } from "react";

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const dataTransfer = new DataTransfer();

  Array?.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

export const FileInputImage = ({ ...props }) => {
  const [preview, setPreview] = useState("");
  return (
    <div className="grid grid-cols-1 space-y-2 my-2">
      <div className="flex items-center justify-center w-full">
        <label
          className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 group text-center p-10">
          {preview && (
            <Avatar className=" h-48 w-48 mx-auto rounded-sm pb-10 ">
              <AvatarImage
                src={preview}
                className=" mx-auto rounded-sm object-contain"
              />
              <AvatarFallback className="rounded-sm">ຮູບພາບ</AvatarFallback>
            </Avatar>
          )}
          {!preview && (
            <div className="h-full w-full text-center flex flex-col items-center justify-center   ">
              <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                <img
                  className="has-mask h-36 object-center"
                  src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                  alt="freepik image"
                />
              </div>
              <p className="pointer-none text-gray-500 ">
                <a className="text-blue-600 hover:underline">
                  select a file
                </a>{" "}
                from your computer
              </p>
            </div>
          )}
          <Input
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
