import { Button, Link } from "@src/shadcn/elements";
import { FileText } from "lucide-react";
import React from "react";
import type { IEmployee } from "../../interface";
import { useList } from "@refinedev/core";
import type { IDocument } from "@src/app/(protected)/(personal)/document/interface";
import {
  type BaseRecord,
  type GetListResponse,
} from "@refinedev/core";

export const DocumentPDF: React.FC<{ record?: IEmployee }> = ({ record }) => {
  const profileId = record?.profileId ?? 0;
  const documentData = useDocument<IDocument>({ profileId });
  return (
    <>
      {documentData?.data?.data?.map((document) => {
        return (
          <div className="w-full my-1 border rounded-lg sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
            <div className="flex justify-between p-2 m-2 border rounded-md">
              <div className="flex flex-wrap">
                <div className="px-2">
                  <FileText className="w-7 h-7 mt-0.5" />
                </div>
                <div className="pt-1 font-bold">{document.documentName}:</div>
              </div>
              <Button className="w-20">
                <Link className="w-full" href={`/document/show/${document.id}`}>
                  ເຂົາເບີ່ງ
                </Link>
              </Button>
            </div>
          </div>
        );
      })}
    </>
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
