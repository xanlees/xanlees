/* eslint-disable @typescript-eslint/no-unsafe-assignment, max-lines-per-function */
import { Document, Page } from "react-pdf";
import { useEffect, useState } from "react";
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
  const [containerWidth, setContainerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setContainerWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const calculateResponsiveWidth = () => {
    const scale = 0.5;
    const maxWidth = 100;
    const responsiveWidth = Math.min(containerWidth, pageWidth) * scale;
    return Math.max(responsiveWidth, maxWidth);
  };

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
          width={calculateResponsiveWidth()}
        />
      </Document>
    </div>
  );
}
