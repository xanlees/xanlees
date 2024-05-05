import { Document, Page } from "react-pdf";
import type { PdfViewerDocumentProps } from "./interface";
export function PdfViewerDocument({ file, options, pageNumber, onDocumentLoadSuccess, onPageLoadSuccess, pageWidth, setLoading }: Readonly<PdfViewerDocumentProps>) {
  return (
    <div className="mx-auto overflow-hidden ">
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options} renderMode="canvas" >
        <Page
          key={pageNumber}
          pageNumber={pageNumber}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          onLoadSuccess={onPageLoadSuccess}
          onRenderError={() => {
            setLoading(false);
          }}
        />
      </Document>
    </div>
  );
}
