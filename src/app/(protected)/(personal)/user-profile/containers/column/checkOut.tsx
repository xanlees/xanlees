
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogDescription,
} from "@src/shadcn/elements";
import React, { useState } from "react";

export function ProfileImageDialog({ imageUrl, thumbnail }: { imageUrl: string, thumbnail: string }): JSX.Element {
  const [open, setOpen] = useState(false);
  const toggleDialog = () => {
    setOpen(!open);
  };
  return (
    <div className="">
      <button onClick={toggleDialog}>
        {thumbnail && <Image src={thumbnail} alt="profile image" className="object-cover object-center w-full h-full rounded-full" width={50} height={50} />}
      </button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="rounded-lg w-fit">
          <AlertDialogHeader>
            <AlertDialogDescription>
              <Image src={imageUrl} alt="profile image" className="object-contain object-center w-full h-full" width={500} height={500} />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ປິດ</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
