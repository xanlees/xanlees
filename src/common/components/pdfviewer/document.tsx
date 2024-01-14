/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Document, Page } from "react-pdf";

const scale = 0.8;
const maxWidth = 390;
export function PdfViewerDocument({
  file, options, pageNumber, onDocumentLoadSuccess, onPageLoadSuccess, pageWidth, setLoading,
}: {
  file: any
  options: any
  pageNumber: number
  onDocumentLoadSuccess: ({
    numPages,
  }: {
    numPages: number
  }) => void
  onPageLoadSuccess: () => void
  pageWidth: number
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <div className="flex justify-center h-full mx-auto">
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
        renderMode="canvas"
      >
        <Page
          key={pageNumber}
          pageNumber={pageNumber}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          onLoadSuccess={onPageLoadSuccess}
          onRenderError={() => { setLoading(false); }}
          width={Math.max(pageWidth * scale, maxWidth)} />
      </Document>
    </div>
  );
}
