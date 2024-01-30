import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "@src/shadcn/elements"
import PDFViewer from "@src/common/components/pdfviewer";

export function DialogCloseButton() {
    const file = "https://pdfobject.com/pdf/sample.pdf";
    const title = "Sample PDF";
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Share</Button>
            </DialogTrigger>
            <DialogContent className="left-[20%] w-[900px]">
                <DialogHeader>

                    <DialogDescription>
                        <PDFViewer
                            file={file}
                            // {...documentData}
                            title={title}
                        />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}