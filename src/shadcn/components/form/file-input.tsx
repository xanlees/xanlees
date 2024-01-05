import { Avatar, AvatarFallback, AvatarImage, Input } from "@src/shadcn/elements";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@src/shadcn/elements/form"
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
  return (
    <>
      <Input
        type="file"
        {...props.rest}
        onChange={(event) => {
          const { files, displayUrl } = getImageData(event)
          setPreview(displayUrl);
          props.onChange(files);
        }}
      />
      <Avatar className="w-64 h-64 mx-auto">
        <AvatarImage src={preview} />
        <AvatarFallback>Avatar</AvatarFallback>
      </Avatar>
    </>
  )
}
