/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-nested-callbacks */
/* eslint-disable @typescript-eslint/naming-convention */
import { PlusSquare } from "lucide-react";
import React from "react";
const Index = () => {
  return (
    <LayoutTable>
      <HeaderTable />
      <TableSkeleton/>
    </LayoutTable>
  );
};
export default Index;

export const LayoutTable = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4 mx-auto">
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeaderTable = () => {
  return (
    <div className="px-6 py-4 border-b border-gray-200 grid gap-3 md:flex md:justify-between md:items-center dark:border-gray-700">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Table
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Add users, edit and more.
        </p>
      </div>
      <div>
        <div className="inline-flex gap-x-2">
          <a
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            href="#"
          >
            View all
          </a>
          <a
            className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            href="#"
          >
            <PlusSquare className="flex-shrink-0 w-3 h-3" />
            Add user
          </a>
        </div>
      </div>
    </div>
  );
};

export const TableSkeleton = () => {
  const th = [
    { id: 1, name: "Header 1" },
    { id: 2, name: "Header 2" },
    { id: 3, name: "Header 3" },
    { id: 4, name: "Header 4" },
    { id: 5, name: "Header 5" },
    { id: 6, name: "Header 6" },
  ];
  const body = [
    { id: 1, name: "Header 1" },
    { id: 2, name: "Header 2" },
    { id: 3, name: "Header 3" },
    { id: 4, name: "Header 4" },
    { id: 5, name: "Header 5" },
    { id: 6, name: "Header 6" },
  ];
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-slate-800">
        <tr>
          {th.map((item, index) => (
            <th scope="col" className="py-3 pl-6">
              <div className="flex items-center gap-x-2">
                <span className="text-xs font-semibold tracking-wide text-gray-800 uppercase dark:text-gray-200">
                  {item?.name as any}
                </span>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        <tr>
          {body.map((item, index) => (
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-6 py-3">
                <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Example
                </span>
              </div>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};
