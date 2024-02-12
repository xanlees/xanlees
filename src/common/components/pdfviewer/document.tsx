import { type Dispatch, type SetStateAction } from "react";
import { Document, Page } from "react-pdf";
import { useMediaQuery } from "react-responsive";

interface PdfViewerDocumentProps {
  file: File | string
  options: object
  pageNumber: number
  onDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void
  onPageLoadSuccess: () => void
  pageWidth: number
  setLoading: Dispatch<SetStateAction<boolean>>
}

const maxWidth = 100;
const bigScale = 0.8;
const smallScale = 0.5;

export function PdfViewerDocument({ file, options, pageNumber, onDocumentLoadSuccess, onPageLoadSuccess, pageWidth, setLoading }: Readonly<PdfViewerDocumentProps>) {
  const isXLargeScreen = useMediaQuery({ query: "(min-width: 2400px)" });
  const isXXLargeScreen = useMediaQuery({ query: "(min-width: 3840px)" });
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1200px)" });
  const isMediumScreen = useMediaQuery({ query: "(min-width: 992px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  let scale = bigScale;
  if (isXLargeScreen || isXXLargeScreen || isLargeScreen || isMediumScreen || isSmallScreen) {
    if (isSmallScreen) {
      scale = smallScale;
    }
  }
  return (
    <div className="mx-auto overflow-y-scroll">
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options} renderMode="canvas" className="h-[500px]" >
        <Page
          key={pageNumber}
          pageNumber={pageNumber}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          onLoadSuccess={onPageLoadSuccess}
          onRenderError={() => {
            setLoading(false);
          }}
          width={Math.max(pageWidth * bigScale, maxWidth)}
        />
      </Document>
    </div>
  );
}
