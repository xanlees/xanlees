/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PdfViewerControls } from ".";
import { PdfViewerDocument } from "./document";

export function PdfViewerContent({
  loading, goToNextPage, goToPreviousPage, pageNumber, numPages, pageWidth, setLoading, onDocumentLoadSuccess, onPageLoadSuccess, options, file,
}: {
  loading: boolean
  goToNextPage: () => void
  goToPreviousPage: () => void
  pageNumber: number
  numPages: number
  pageWidth: number
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  onDocumentLoadSuccess: ({
    numPages,
  }: {
    numPages: number
  }) => void
  onPageLoadSuccess: () => void
  options: any
  file: any
}) {
  return (
    <div
      hidden={loading}
      style={{ height: "calc(100vh - 64px)" }}
      className="flex items-center"
    >
      {/* <PdfViewerControls goToPreviousPage={goToPreviousPage} goToNextPage={goToNextPage}
        pageNumber={pageNumber} numPages={numPages} /> */}
      <PdfViewerDocument file={file} options={options}
        pageNumber={pageNumber} onDocumentLoadSuccess={onDocumentLoadSuccess}
        onPageLoadSuccess={onPageLoadSuccess} pageWidth={pageWidth}
        setLoading={setLoading} />
    </div>
  );
}
