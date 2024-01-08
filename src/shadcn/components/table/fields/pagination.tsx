import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { UseTableReturnType as Table } from "@refinedev/react-table";

import {
    Button,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../elements";
import { BaseRecord } from "@refinedev/core";

interface DataTablePaginationProps<TData extends BaseRecord = BaseRecord> {
    table: Table<TData>;
}

export function Pagination<TData extends BaseRecord = BaseRecord>({
    table,
}: DataTablePaginationProps<TData>) {
    return (
        <div className="flex flex-col items-center justify-between sm:flex-row gap-y-4 sm-gap-y-0">
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} ໃນ{" "}
                {table.getFilteredRowModel().rows.length} ແຖວ.
            </div>
            <div className="flex flex-col-reverse items-center space-x-6 gap-y-4 sm:gap-y-0 sm:flex-row lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">ແຖວຂໍ້ມູນຕໍ່ຫນ້າ</p>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value));
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue
                                placeholder={
                                    table.getState().pagination.pageSize
                                }
                            />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem
                                    key={pageSize}
                                    value={`${pageSize}`}
                                >
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center justify-center text-sm font-medium w-fit">
                    ໜ້າ {table.getState().pagination.pageIndex + 1} ໃນ{" "}
                    {table.getPageCount()}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden w-8 h-8 p-0 lg:flex"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to first page</span>
                        <DoubleArrowLeftIcon className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="w-8 h-8 p-0"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeftIcon className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="w-8 h-8 p-0"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRightIcon className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden w-8 h-8 p-0 lg:flex"
                        onClick={() =>
                            table.setPageIndex(table.getPageCount() - 1)
                        }
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to last page</span>
                        <DoubleArrowRightIcon className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
