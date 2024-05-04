import { Document, Page } from "react-pdf";
import { useMediaQuery } from "react-responsive";
import type { PdfViewerDocumentProps } from "./interface";
import { Nav } from "./nav";
const maxWidth = 60;
const bigScale = 0.4;
const smallScale = 0.5;
const mediumScale = 0.4;

export function PdfViewerDocument({ file, options, pageNumber, onDocumentLoadSuccess, onPageLoadSuccess, pageWidth, setLoading, numPages, downloadUrl }: Readonly<PdfViewerDocumentProps>) {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1200px)" });
  const isMediumScreen = useMediaQuery({ query: "(min-width: 1200px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  let scale = bigScale;
  if (isSmallScreen) {
    scale = smallScale;
  }
  if (isMediumScreen) {
    scale = mediumScale;
  }
  if (isLargeScreen) {
    scale = bigScale;
  }
  return (
    <div className="mx-auto overflow-hidden ">
      <Nav pageNumber={pageNumber} numPages={numPages} downloadUrl={downloadUrl} title={""}/>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options} renderMode="canvas" className="h-[600px] overflow-y-scroll pl-12 " >
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
