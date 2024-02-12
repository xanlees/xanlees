/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PdfViewerControls } from ".";
import { PdfViewerDocument } from "./document";
import type { PdfViewerContentProps } from "./interface";

export function PdfViewerContent({
  loading,
  goToNextPage,
  goToPreviousPage,
  pageNumber,
  numPages,
  pageWidth,
  setLoading,
  onDocumentLoadSuccess,
  onPageLoadSuccess,
  options,
  file,
}: Readonly<PdfViewerContentProps>) {
  return (
    <div
      hidden={loading}
      className="flex flex-col mx-auto"
    >
      <PdfViewerDocument file={file} options={options}
        pageNumber={pageNumber} onDocumentLoadSuccess={onDocumentLoadSuccess}
        onPageLoadSuccess={onPageLoadSuccess} pageWidth={pageWidth}
        setLoading={setLoading} />
      <PdfViewerControls goToPreviousPage={goToPreviousPage} goToNextPage={goToNextPage} pageNumber={pageNumber} numPages={numPages} />
    </div>
  );
}
