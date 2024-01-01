/* eslint-disable @typescript-eslint/naming-convention */
export const InputFromLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="sm:col-span-9">
      <div className="gap-2 sm:flex">{children}</div>
    </div>
  );
};
