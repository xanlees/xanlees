import { ButtonCreate } from "@src/common/elements/button";
import { Card, CardHeader, CardTitle } from "@src/shadcn/elements";
import { CardView } from "@src/shadcn/components/table/card-view";
import { FileText } from "lucide-react";
import { getActionsButton } from "@src/common/containers/column/actionCard";
import { useTable } from "@refinedev/react-table";
import React, { useMemo, type ReactNode } from "react";
import type { IDocument } from "@src/app/(protected)/(personal)/document/interface";
import { PDFDialog } from "@src/app/(protected)/(hr)/application/containers/show/PDFDialog";

export function DocumentPDFCard({ profileId }: { profileId: number }): JSX.Element {
  const { table } = useCardViewPDF(profileId);
  if (!table) {
    return <div>Loading...</div>;
  }
  return (
    <CardLayout profileId={profileId}>
      <CardView
        table={table}
        className="w-80 m-2 flex-col"
        showSearchBar={false}
        showPagination={false}
      >
        <CardView.Row<IDocument>
          header=""
          id="id"
          accessorKey="id"
          cell={({ row }) => {
            const document = row.original;
            return <DocumentRow document={document} />;
          }}
        />
        {getActionsButton("document")}
      </CardView>
    </CardLayout>
  );
}

function CardLayout({ children, profileId }: { children: ReactNode, profileId?: number }): JSX.Element {
  const redirect = `/document/create/${profileId}/create`;
  return (
    <Card className="shadow-xl pb-3 rounded-lg w-full sm:w-80 bg-white dark:bg-gray-800 dark:text-white h-fit">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
          {"ເອກກສານ"}
        </CardTitle>
        <ButtonCreate redirect={redirect} />
      </CardHeader>
      {children}
    </Card>
  );
}

const DocumentRow: React.FC<{ document: IDocument }> = ({ document }) => {
  return (
    <div className="-mx-40 flex justify-between p-2 px-5 m-2 rounded-md">
      <div className="flex flex-wrap">
        <div className="px-2">
          <FileText className="w-7 h-7 mt-0.5" />
        </div>
        <div className="pt-1 font-bold">{document.documentName ?? ""}</div>
      </div>
      <PDFDialog
        documentName={document.documentName ?? ""}
        documentFile={document.documentFile ?? ""}
      />
    </div>
  );
};

const useCardViewPDF = (profileId: number) => {
  const columns = useMemo(() => [], []);
  const table = useTable<IDocument>({
    columns,
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      errorNotification: false,
      resource: "document",
      filters: {
        permanent: [{ field: "profile_id", operator: "eq", value: profileId }],
      },
    },
  });
  return { table };
};
