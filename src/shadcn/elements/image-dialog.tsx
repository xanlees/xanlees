import React, { useState } from "react";
import Image from "next/image";
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
import { ShieldX } from "lucide-react";

export interface ImageDialogProps {
    src: string | null | undefined;
    icon?: React.ReactNode;
}

function AvatarWithButton({ src, onClick }: { src: string, onClick: () => void }) {
    return (
        <button onClick={onClick}>
            <Avatar className="w-16 h-16 overflow-hidden border-4 border-white rounded-full shadow-sm ">
                <Image
                    src={src}
                    width={64}
                    height={64}
                    alt="Picture of the author"
                    loading="lazy"
                    // onError={(e) => {
                    //     (e.target as HTMLImageElement).src = '/images/profile.png';
                    // }}
                />
                <AvatarFallback className="flex items-center justify-center h-full">ບໍ່ມີຂໍ້ມູນ</AvatarFallback>
            </Avatar>
        </button>
    );
}

function DialogContent({ src }: { src: string }) {
    return (
        <AlertDialogContent className="w-fit rounded-lg">
            <AlertDialogHeader>
                <AlertDialogDescription>
                    <Avatar className="w-80 h-80 mx-auto overflow-hidden border-4 border-white rounded-lg shadow-sm sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] ">
                        <AvatarImage src={src} alt="profile image" className="object-contain object-center w-full h-full" />
                        <AvatarFallback className="flex items-center justify-center h-full">ບໍ່ມີຂໍ້ມູນ</AvatarFallback>
                    </Avatar>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>ປິດ</AlertDialogCancel>
            </AlertDialogFooter>
        </AlertDialogContent>
    );
}


export function ImageDialog({ src, icon = <ShieldX color="#ff0000" size={30} /> }: ImageDialogProps): JSX.Element {
    const [open, setOpen] = useState(false);
    const toggleDialog = () => {
        if (src) {
            setOpen(!open);
        }
    };
    return (
        <div className="">
            {src ? (
                <AvatarWithButton src={src} onClick={toggleDialog} />
            ) : (
                <div className="ml-4">
                    {icon}
                </div>
            )}
            <AlertDialog open={open} onOpenChange={setOpen}>
                <DialogContent src={src ?? ""} />
            </AlertDialog>
        </div>
    );
}
