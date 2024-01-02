/* eslint-disable @typescript-eslint/naming-convention */

import React from "react";
interface ChildrenProps {
  children: React.ReactNode
}
const EmployeeContainer: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <div className="w-full min-h-full p-5 rounded-lg space-y-3 dark:text-white">
      {children}
    </div>
  );
};
const CardSection: React.FC<ChildrenProps> = ({ children }) => {
  return <div className="flex flex-wrap w-full rounded-lg">{children}</div>;
};
const TableSection: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <div className="overflow-x-auto ">
      {children}
    </div>
  );
};
export { EmployeeContainer, CardSection, TableSection };
