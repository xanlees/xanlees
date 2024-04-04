"use client";

import { Show } from "@src/shadcn/components/crud";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";
import PDFViewer from "@src/common/components/pdfviewer";
import type { IDocument } from "../../interface";
import { useList } from "@refinedev/core";

export default function DocumentShow({ params }: { params: { id: number } }): JSX.Element {
  const { id } = params;
  const breadcrumbs = [
    { label: "ເອກກະສານ", href: "/employee" },
    { label: "Create" },
  ];
  const { data: documentData } = useList<IDocument>({
    resource: "document",
    errorNotification: false,
    filters: [
      {
        field: "id",
        operator: "eq",
        value: id,
      },
    ],
  });
  const title = documentData?.data?.[0].documentName ?? "";
  const fileLink = "http://127.0.0.1:8000/media/document/sample.pdf";
  return (
    <Show
      resource="employee"
      breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}
    >
      <PDFViewer
        file={fileLink}
        {...documentData}
        title={title}
      />
    </Show>
  );
}
