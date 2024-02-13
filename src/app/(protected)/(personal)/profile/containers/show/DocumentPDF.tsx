import { FileText } from "lucide-react";
import React from "react";
import type { IDocument } from "@src/app/(protected)/(personal)/document/interface";
import {
  useList,
  type BaseRecord,
  type GetListResponse,
} from "@refinedev/core";
import { PDFDialog } from "@src/app/(protected)/(hr)/application/containers/show/PDFDialog";

export const DocumentPDF: React.FC<{ profileId: number }> = ({ profileId }) => {
  const documentData = useDocument<IDocument>({ profileId });
  return (
    <div className="w-full my-1 border rounded-lg sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
      {documentData?.data?.data?.map((document, index) => {
        return (
          <div
            key={document.id}
            className="flex justify-between p-2 m-2 border rounded-md"
          >
            <div className="flex flex-wrap">
              <div className="px-2">
                <FileText className="w-7 h-7 mt-0.5" />
              </div>
              <div className="pt-1 font-bold">{document.documentName}:</div>
            </div>
            <PDFDialog
              documentName={document.documentName}
              documentFile={document?.documentFile ?? ""}
            />
          </div>
        );
      })}
    </div>
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
