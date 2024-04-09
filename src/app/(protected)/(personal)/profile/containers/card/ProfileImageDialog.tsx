import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
  Button,
  AlertDialogHeader,
  AlertDialogDescription,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@src/shadcn/elements";
import React, { useState } from "react";

export function ProfileImageDialog({ imageUrl, fullname, nickname }: { imageUrl: string, fullname: string, nickname: string }): JSX.Element {
  const [open, setOpen] = useState(false);
  const handleDownload = downloadImage({ imageUrl, fullname, nickname });
  return (
    <div className="mx-auto justify-center content-center items-center flex ">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="justify-center mx-auto">
            ເປີດເບີ່ງຮູບໃຫຍ່
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-fit rounded-lg">
          <AlertDialogHeader>
            <AlertDialogDescription>
              <Avatar className="w-80 h-80 mx-auto overflow-hidden border-4 border-white rounded-lg shadow-sm sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] ">
                <AvatarImage src={imageUrl} alt="profile image" className="object-contain object-center w-full h-full" />
                <AvatarFallback className="flex items-center justify-center h-full">ຮູບພາບ</AvatarFallback>
              </Avatar>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={handleDownload}>ດາວໂຫຼດຮູບ</Button>
            <AlertDialogCancel>ປິດ</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
function downloadImage({ imageUrl, fullname, nickname }: { imageUrl: string, fullname: string, nickname: string }) {
  return async() => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fullname}(${nickname})`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };
}

