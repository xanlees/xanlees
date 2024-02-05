import type { IDocument } from "../../interface";
import { Card, CardTitle } from "@src/shadcn/elements";
import { FileText } from "lucide-react";
import { PDFDialog } from "./PDFDialog";

export function DocumentList({ documentData = [] as IDocument[] | { data: IDocument[] } }: Readonly<{
  header: string
  documentData?: IDocument[] | { data: IDocument[] }
}>): JSX.Element {
  const documentDataArray = Array.isArray(documentData) ? documentData : documentData.data;
  return (
    <Card className="w-full p-2 rounded-sm sm:w-full md:w-full">
      <CardTitle className="text-xl">ເອກກະສານ</CardTitle>
      {documentDataArray?.map((document) => {
        return (
          <div
            key={document.id}
            className="flex justify-between p-2 m-2 border rounded-md"
          >
            <div className="flex flex-wrap">
              <div className="px-2">
                <FileText className="w-7 h-7 mt-0.5" />
              </div>
              <div className="pt-1 font-bold">{document.documentName}</div>
            </div>
            <PDFDialog documentName={document.documentName} documentFile={document.documentFile}/>
          </div>
        );
      })}
    </Card>
  );
}
