import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogDescription,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@src/shadcn/elements";
import React, { useState } from "react";

export function CardImageDialog({ imageUrl }: { imageUrl: string }): JSX.Element {
  const [open, setOpen] = useState(false);
  const toggleDialog = () => {
    setOpen(!open);
  };
  return (
    <div className="">
      <button onClick={toggleDialog}>
        <Avatar className="w-16 h-16 overflow-hidden border-4 border-white rounded-full shadow-sm ">
          <AvatarImage src={imageUrl} alt="profile image" className="object-cover object-center w-full h-full"/>
          <AvatarFallback className="flex items-center justify-center h-full" />
        </Avatar>
      </button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="w-fit rounded-lg">
          <AlertDialogHeader>
            <AlertDialogDescription>
              <Avatar className="w-80 h-80 mx-auto overflow-hidden border-4 border-white rounded-lg shadow-sm sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] ">
                <AvatarImage src={imageUrl} alt="profile image" className="object-contain object-center w-full h-full" />
                <AvatarFallback className="flex items-center justify-center h-full">ບໍ່ມີຂໍ້ມູນ</AvatarFallback>
              </Avatar>
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
