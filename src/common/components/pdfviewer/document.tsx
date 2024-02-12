/* eslint-disable complexity, no-magic-numbers */
/* eslint-disable @typescript-eslint/no-unsafe-assignment, max-lines-per-function */
import { type Dispatch, type SetStateAction } from "react";
import { Document, Page } from "react-pdf";
import { useMediaQuery } from "react-responsive";

const maxWidth = 100;

interface PdfViewerDocumentProps {
  file: any
  options: any
  pageNumber: number
  onDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void
  onPageLoadSuccess: () => void
  pageWidth: number
  setLoading: Dispatch<SetStateAction<boolean>>
}

export function PdfViewerDocument({
  file,
  options,
  pageNumber,
  onDocumentLoadSuccess,
  onPageLoadSuccess,
  pageWidth,
  setLoading,
}: Readonly<PdfViewerDocumentProps>) {
  const isXLargeScreen = useMediaQuery({ query: "(min-width: 2400px)" });
  const isXXLargeScreen = useMediaQuery({ query: "(min-width: 3840px)" });
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1200px)" });
  const isMediumScreen = useMediaQuery({ query: "(min-width: 992px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  const bigScale = 0.8;
  const smallScale = 0.5;
  let scale = bigScale;

  if (isXLargeScreen || isXXLargeScreen || isLargeScreen || isMediumScreen || isSmallScreen) {
    if (isSmallScreen) {
      scale = smallScale;
    }
  }

  return (
    <div className="mx-auto overflow-y-scroll">
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
        renderMode="canvas"
        className="h-[500px]"
      >
        <Page
          key={pageNumber}
          pageNumber={pageNumber}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          onLoadSuccess={onPageLoadSuccess}
          onRenderError={() => {
            setLoading(false);
          }}
          width={Math.max(pageWidth * scale, maxWidth)}
        />
      </Document>
    </div>
  );
}
