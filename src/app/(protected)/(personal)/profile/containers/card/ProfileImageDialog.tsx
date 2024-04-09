"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
  Button,
  AlertDialogHeader,
  AlertDialogDescription,
  Avatar, AvatarFallback, AvatarImage,
} from "@src/shadcn/elements";

export function ProfileImageDialog({ imageUrl }: { imageUrl: string }): JSX.Element {
  return (
    <div className="mx-auto justify-center content-center items-center flex ">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="justify-center mx-auto  ">ເປີດເບີ່ງຮູບໃຫຍ່</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-fit rounded-lg">
          <AlertDialogHeader>
            <AlertDialogDescription>
              <Avatar className="w-80 h-80 mx-auto overflow-hidden border-4 border-white rounded-lg shadow-sm sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] ">
                <AvatarImage src={imageUrl} alt="profile image" className="object-contain object-center w-full h-full"/>
                <AvatarFallback className="flex items-center justify-center h-full">Profile Image</AvatarFallback>
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
