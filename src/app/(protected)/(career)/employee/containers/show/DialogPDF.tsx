import { Button, Dialog, DialogContent, DialogTrigger } from "@src/shadcn/elements";
import PDFViewer from "@src/common/components/pdfviewer";

export default function DialogPDF(): JSX.Element {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild={true} >
          <Button variant="outline">Share</Button>
        </DialogTrigger>
        <DialogContent className="flex items-center justify-center h-[calc(100vh - 64px)] w-full mt-10">
          <PDFViewer file={"https://pdfobject.com/pdf/sample.pdf"} />
        </DialogContent>
      </Dialog>
    </>
  );
}
