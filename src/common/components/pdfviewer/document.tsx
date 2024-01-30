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
  const bigScale = 0.8;
  const smallScale = 0.5;

  let scale = bigScale;
  if (isBigScreen) {
    scale = bigScale;
  } else if (isTabletOrMobile) {
    scale = smallScale;
  }

  return (
    <div className="mx-auto overflow-y-scroll ">
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
        renderMode="canvas"
        className="w-[1220px] h-[500px]"
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
