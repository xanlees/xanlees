import { FileText } from "lucide-react";
import React from "react";
import type { IDocument } from "@src/app/(protected)/(personal)/document/interface";
import {
  useList,
  type BaseRecord,
  type GetListResponse,
} from "@refinedev/core";
import { PDFDialog } from "@src/app/(protected)/(hr)/application/containers/show/PDFDialog";
import { Card, CardHeader, CardTitle } from "@src/shadcn/elements";

export const DocumentPDF: React.FC<{ profileId: number }> = ({ profileId }) => {
  const documentData = useDocument<IDocument>({ profileId });
  return (
    <Card className="w-full pb-3 bg-white rounded-lg shadow-xl dark:bg-gray-800 dark:text-white h-fit ">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 border-b">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
          {"ທີ່ຢູ່"}
        </CardTitle>
      </CardHeader>
      {documentData?.data?.data?.map((document, index) => {
        return (
          <div
            key={document.id}
            className="flex justify-between p-2 m-2 rounded-md"
          >
            <div className="flex flex-wrap">
              <div className="px-2">
                <FileText className="w-7 h-7 mt-0.5" />
              </div>
              <div className="pt-1 font-bold">{document.documentName}</div>
            </div>
            <PDFDialog
              documentName={document.documentName}
              documentFile={document?.documentFile ?? ""}
            />
          </div>
        );
      })}
    </Card>
  );
};

export const useDocument = <T extends BaseRecord>({
  profileId,
}: {
  profileId: number
}): { data: GetListResponse<T> | undefined } => {
  const { data } = useList<T>({
    resource: "document",
    filters: [
      {
        field: "profile_id",
        operator: "eq",
        value: profileId,
      },
    ],
    errorNotification: false,
  });
  return { data };
};
