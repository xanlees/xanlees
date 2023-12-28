/* eslint-disable @typescript-eslint/naming-convention */

import React from "react";

interface ChildrenProps {
  children: React.ReactNode
}

const EmployeeContainer: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <div className="w-full min-h-full p-5 space-y-3 bg-red-500 rounded-lg">{children}</div>
  );
};

const CardSection: React.FC<ChildrenProps> = ({ children }) => {
  return <div className="flex flex-wrap w-full bg-green-500 rounded-lg">{children}</div>;
};

export { EmployeeContainer, CardSection };
