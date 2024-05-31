"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
  Button,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@src/shadcn/elements";

export function UniqueNumberList({ uniqueNumber }: { uniqueNumber: string[] }): JSX.Element {
  return (
    <Card className="pb-3 bg-white rounded-lg shadow-xl dark:bg-gray-800 dark:text-white h-fit">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 border-b">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
          ເລກລະຫັດເຄື່ອງຂາຍເລກ
        </CardTitle>
      </CardHeader>
      <div className="flex justify-between p-2 m-2 rounded-md" >
        <div className="flex flex-wrap">
          <div className="pt-1 px-2 font-bold">{"ຂໍ້ມູນເລກເຄື່ອງຂາຍເລກ"}</div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">ເປີດ</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="w-96">
            <AlertDialogHeader>
              <AlertDialogTitle>ຕາຕະລາງເລກເຄຶ່ອງຂາຍເລກ</AlertDialogTitle>
              <AlertDialogDescription>
                <UniqueNumberTable uniqueNumber={uniqueNumber}/>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>ປິດ</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Card>
  );
}

function UniqueNumberTable({ uniqueNumber }: { uniqueNumber: string[] }): JSX.Element {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
        <Thead />
        <Tbody uniqueNumber={uniqueNumber} />
      </table>
    </div>
  );
}

function Thead(): JSX.Element {
  return (
    <thead className="bg-gray-50 dark:bg-gray-800">
      <tr>
        <th scope="col" className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
          {"ລຳ​ດັບ"}
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" >
          ເລກລະຫັດ
        </th>
      </tr>
    </thead>
  );
}

function Tbody({ uniqueNumber }: { uniqueNumber: string[] }): JSX.Element {
  return (
    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-600">
      {uniqueNumber?.map((number, index) => (
        <tr key={index}>
          <td className="px-4 py-2 whitespace-nowrap text-gray-900 dark:text-gray-100">{index + 1}</td>
          <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{number}</td>
        </tr>
      ))}
    </tbody>
  );
}
