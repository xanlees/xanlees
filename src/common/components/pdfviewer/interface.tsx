export interface PDFViewerProps {
  file: File | string
  title: string
}

export interface PdfViewerControlsProps {
  goToPreviousPage: () => void
  goToNextPage: () => void
  pageNumber: number
  numPages: number
}

export interface PdfViewerButtonProps {
  onClick: () => void
  disabled: boolean
  children: React.ReactNode
}

export interface PdfViewerContentProps {
  loading: boolean
  goToNextPage: () => void
  goToPreviousPage: () => void
  pageNumber: number
  numPages: number
  pageWidth: number
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  onDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void
  onPageLoadSuccess: () => void
  options: object
  file: File | string
}

export interface PdfViewerDocumentProps {
  file: File | string
  options: object
  pageNumber: number
  onDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void
  onPageLoadSuccess: () => void
  pageWidth: number
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export interface NavProps {
  pageNumber: number
  numPages: number
  title: string
}
