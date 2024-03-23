import PDFViewer from "@src/common/components/pdfviewer";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
  Button,
} from "@src/shadcn/elements";

interface PDFDialogProps {
  documentName: string
  documentFile?: File | string
}

export function PDFDialog({ documentName, documentFile }: PDFDialogProps) {
  return (
    <AlertDialog >
      <AlertDialogTrigger asChild >
        <Button variant="outline">ເປີດເອກະສານ</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className=" z-50  w-[45%] h-[95%] translate-x-[-50%] translate-y-[-50%] gap-0 border bg-background p-0 shadow-lg ">
        <PDFViewer
          file={documentFile}
          title={documentName}
        />
        <AlertDialogFooter>
          <AlertDialogCancel className="mr-20 bg-red-500 w-20 text-white">ປິດ</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
