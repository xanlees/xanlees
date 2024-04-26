import { PopperContentProps } from "@radix-ui/react-popover";
import { BaseOption, BaseRecord, HttpError } from "@refinedev/core";
import { UseTableReturnType } from "@refinedev/react-table";
import {
  CellContext,
  Column,
  ColumnDef,
  ColumnDefTemplate,
  flexRender,
} from "@tanstack/react-table";
import React, { FC, ReactElement, useCallback, useMemo } from "react";
import { Pagination } from "../fields/pagination";
import { DataTableToolbar } from "../toolbar";
import { DataTableSearchBar } from "../toolbar/table-search";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@src/shadcn/elements";
import { cn } from "@src/shadcn/lib/utils";

export type TableListFilterOption = BaseOption & {
  icon?: React.ComponentType<{ className?: string }>;
};

export type TableFilterProps<TData extends BaseRecord = BaseRecord> = {
  column: Column<TData, unknown>;
  title?: string;
  numberOfMonths?: number;
  align?: PopperContentProps["align"];
  options?: TableListFilterOption[];
};

export type ColumnProps<
  TData extends BaseRecord = BaseRecord,
  TValue = unknown,
  TError extends HttpError = HttpError
> = {
  id: string;
  accessorKey: string;
  header?:
    | string
    | FC<{
        table: UseTableReturnType<TData, TError>;
      }>;
  cell?:
    | ColumnDefTemplate<CellContext<TData, TValue>>
    | { getValue(): () => any };
  children?: ReactElement;
  isHeader?: boolean;
  isAction?: boolean;
};

export type TableProps<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError
> = {
  children?: ReactElement<ColumnProps<TData, TError>>[];
  table: UseTableReturnType<TData, TError>;
  className?: string;
  classNameRow?: string;
  showSearchBar?: boolean;
  showPagination?: boolean;
};

function renderContent(cell: any, className?: string ) {
  return (
    <div className="flex flex-row" >
      <div key={cell.column.id} className={cn("w-1/2 font-bold ", className)} >
        {flexRender<any>(cell.column.columnDef.header, {})}
      </div>
      <div key={cell.id}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </div>
    </div>
  );
}

export function CardView<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TData extends BaseRecord = TQueryFnData
>({
  children,
  table,
  className,
  showSearchBar = false,
  showPagination = true,
  classNameRow,
}: TableProps<TData, TError>) {
  const mapColumn = useCallback(
    ({
      id,
      accessorKey,
      header,
      cell,
      isHeader,
      isAction,
    }: ColumnProps<TData, TError>): ColumnDef<TData, unknown> => {
      const column: any = {
        id,
        header,
        accessorKey,
        isHeader,
        isAction,
      };

      if (cell) {
        column["cell"] = cell;
      }

      return column;
    },
    []
  );

  const columns = useMemo<ColumnDef<TData, unknown>[]>(() => {
    if (Array.isArray(children)) {
      return (children as ReactElement[])
        .map((value: ReactElement) => value.props)
        .map(mapColumn);
    }

    return [];
  }, [children]);

  if (table.options.columns.length === 0) {
    table.setOptions({ ...table.options, columns });
  }
  return (
    <div className="space-y-4  ">
      {showSearchBar ? (
        <div className="flex flex-row-reverse gap-1">
          <DataTableToolbar table={table} />
          <DataTableSearchBar table={table} />
        </div>
      ) : null}

      <div className={cn("flex flex-wrap gap-1 ")}>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row: any) => {
            return (
              <Card
                key={row.id}
                className={cn("relative shadow-md  rounded-md   h-fit", className)}
              >
                <div>
                  {row.getVisibleCells().map(
                    (cell: any) =>
                      !cell.column.columnDef.isHeader &&
                      cell.column.columnDef.isAction && (
                        <div key={cell.id}>
                          {flexRender<any>(cell.column.columnDef.header, {})}
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      )
                  )}
                </div>
                <CardHeader>
                  {row.getVisibleCells().map(
                    (cell: any) =>
                      cell.column.columnDef.isHeader &&
                      !cell.column.columnDef.isAction && (
                        <div key={cell.id} className="text-xl ">
                          <CardTitle>
                            {flexRender<any>(cell.column.columnDef.header, {})}
                          </CardTitle>
                          <CardDescription>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </CardDescription>
                        </div>
                      )
                  )}
                </CardHeader>
                <CardContent className="text-sm">
                  {row
                    .getVisibleCells()
                    .map(
                      (cell: any) =>
                        !cell.column.columnDef.isHeader &&
                        !cell.column.columnDef.isAction &&
                        renderContent(cell, classNameRow)
                    )}
                </CardContent>
              </Card>
            );
          })
        ) : (
          <span>ບໍ່ມີຂໍ້ມູນ.</span>
        )}
      </div>
      {showPagination ? <Pagination table={table} /> : null}
    </div>
  );
}

const Row = <
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError
>(
  props: ColumnProps<TData, TError>
) => {
  return props.children;
};

CardView.Row = Row;
CardView.displayName = "Table";
