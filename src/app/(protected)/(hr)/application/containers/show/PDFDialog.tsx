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
    documentName: string;
    documentFile: string;
}

export function PDFDialog({ documentName, documentFile }: PDFDialogProps) {
    return (
        <AlertDialog >
            <AlertDialogTrigger asChild>
                <Button variant="outline">ເປີດເອກະສານ</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <PDFViewer
                    file={documentFile}
                    title={documentName}
                />
                <AlertDialogFooter>
                    <AlertDialogCancel className="mr-20">ປິດ</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
