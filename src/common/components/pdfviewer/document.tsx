/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/no-unsafe-assignment, max-lines-per-function */
import { Document, Page } from "react-pdf";
import { useMediaQuery } from "react-responsive";

const maxWidth = 100;
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
  
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  let scale = 0.8;

  if (isBigScreen) {
    scale = 0.8;
  } else if (isTabletOrMobile) {
    scale = 0.5;
  }

  return (
    <div className="mx-auto overflow-y-scroll ">
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
