/* eslint-disable @typescript-eslint/naming-convention */

import React from "react";

interface ChildrenProps {
  children: React.ReactNode
  title?: string
}

const ApplicationContainer: React.FC<ChildrenProps> = ({ children, title }) => {
  return (
    <div className="w-full min-h-full p-5 bg-red-500 rounded-lg space-y-3">
      <div className="w-full px-2 py-3 text-4xl font-bold text-center bg-white rounded-lg">{title}</div>
      <div className="flex flex-col max-h-full bg-green-500 rounded-lg md:flex-row">
        {children}
      </div>
    </div>
  );
};

const ApplicationSection: React.FC<ChildrenProps> = ({ children }) => {
  return <div className="w-full p-4 md:w-1/2">{children}</div>;
};
export { ApplicationContainer, ApplicationSection };
