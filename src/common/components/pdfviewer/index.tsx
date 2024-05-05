import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import { PdfViewerContent } from "./content";
import type { PDFViewerProps, PdfViewerButtonProps, PdfViewerControlsProps } from "./interface";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default function PDFViewer(props: Readonly<PDFViewerProps>) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [pageWidth, setPageWidth] = useState(0);
  useEffect(() => {
    setPageWidth(window.innerWidth);
    setLoading(false);
  }, []);
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
  const options = { cMapUrl: "cmaps/", cMapPacked: true, standardFontDataUrl: "standard_fonts/" };
  function goToNextPage() {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  }
  function goToPreviousPage() {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  }
  return (
    <div className="">
      <div className="flex flex-row">
        {!loading && (<PdfViewerContent loading={loading} goToNextPage={goToNextPage} goToPreviousPage={goToPreviousPage} pageNumber={pageNumber} numPages={numPages} pageWidth={pageWidth} setLoading={setLoading} onDocumentLoadSuccess={onDocumentLoadSuccess} onPageLoadSuccess={onPageLoadSuccess} options={options} file={props.file} />)}
      </div>
    </div>

  );
}

export function PdfViewerControls({ goToPreviousPage, goToNextPage, pageNumber, numPages }: Readonly<PdfViewerControlsProps>) {
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

function PdfViewerButton({ onClick, disabled, children }: Readonly<PdfViewerButtonProps>) {
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
