import PDFViewer from "@src/common/components/pdfviewer";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@src/shadcn/elements";
interface PDFDialogProps {
  documentName: string
  documentFile?: File | string
}
export function PDFDialog({ documentName, documentFile }: PDFDialogProps) {
  return (
    <Dialog>
      <DialogTrigger><Button>ເບີ່ງ</Button></DialogTrigger>
      <DialogContent className="overflow-x-scroll overflow-y-hidden min-h-[65%]">
        <div className="scale-[85%] -mx-[13%] -my-[15%] relative">
          <PDFViewer
            file={documentFile}
            title={documentName}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
