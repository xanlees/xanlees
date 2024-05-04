import { Button } from "@src/shadcn/elements";
import type { NavProps } from "./interface";

export function Nav({ pageNumber, numPages, title, downloadUrl, fileName }: Readonly<NavProps>) {
  const name = fileName ?? "file";
  return (
    <nav className="bg-black rounded-t-md">
      <div className="px-2 mx-auto sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-12">
          <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
            <div className="flex items-center flex-shrink-0">
              <p className="text-2xl font-bold tracking-tighter text-white">
                {title}
              </p>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md">
              <span>{pageNumber}</span>
              <span className="text-gray-400"> / {numPages}</span>
            </div>
          </div>
          {downloadUrl && <Button>
            <a href={downloadUrl} download={`${name}.pdf`}>ດາວໂຫຼດ</a>
          </Button>}
        </div>
      </div>
    </nav>
  );
}
