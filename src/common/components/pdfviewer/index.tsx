/* eslint-disable max-lines-per-function */
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { pdfjs } from "react-pdf";
import { Nav } from "./nav";
import { PdfViewerContent } from "./content";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PDFViewer(props: { file: any, title: string }) {
  console.log("file", props?.file);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [pageWidth, setPageWidth] = useState(0);
  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: {
    numPages: number
  }) {
    setNumPages(nextNumPages);
  }
  function onPageLoadSuccess() {
    setPageWidth(window.innerWidth);
    setLoading(false);
  }
  const options = {
    cMapUrl: "cmaps/",
    cMapPacked: true,
    standardFontDataUrl: "standard_fonts/",
  };
  function goToNextPage() {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  }
  function goToPreviousPage() {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  }
  return (
    <div className="flex flex-col">
      <Nav pageNumber={pageNumber} numPages={numPages} title={props.title} />
      <PdfViewerContent
        loading={loading}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        pageNumber={pageNumber}
        numPages={numPages}
        pageWidth={pageWidth}
        setLoading={setLoading}
        onDocumentLoadSuccess={onDocumentLoadSuccess}
        onPageLoadSuccess={onPageLoadSuccess}
        options={options}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        file={props.file}
      />{" "}
    </div>
  );
}

export function PdfViewerControls({
  goToPreviousPage,
  goToNextPage,
  pageNumber,
  numPages,
}: {
  goToPreviousPage: () => void
  goToNextPage: () => void
  pageNumber: number
  numPages: number
}) {
  return (
    <div className="flex items-center justify-center">
      <PdfViewerButton onClick={goToPreviousPage} disabled={pageNumber <= 1}>
        <ChevronLeft className="w-10 h-10" aria-hidden="true" />
      </PdfViewerButton>
      <PdfViewerButton onClick={goToNextPage} disabled={pageNumber >= numPages}>
        <ChevronRight className="w-10 h-10" aria-hidden="true" />
      </PdfViewerButton>
    </div>
  );
}

function PdfViewerButton({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void
  disabled: boolean
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className=""
    >
      {children}
    </button>
  );
}
