// /* eslint-disable max-lines-per-function */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
//   Button,
//   Card,
//   CardDescription,
//   CardHeader,
//   CardTitle,
//   Dialog,
//   DialogContent,
//   DialogTrigger,
// } from "@src/shadcn/elements";
// import PDFViewer from "@src/common/components/pdfviewer";
// import { useList } from "@refinedev/core";
// import type { IDocument } from "@src/app/(protected)/(personal)/document/interface";
// import type { IEmployee } from "../../interface";

// const DialogPDF: React.FC<{ profileId: number }> = ({ profileId }) => {
//   const { data } = useList<IDocument>({
//     resource: "document",
//     errorNotification: false,
//     filters: [
//       {
//         field: "profile_id",
//         operator: "eq",
//         value: profileId,
//       },
//     ],
//   });
//   return (
//     <>
//       {data?.data.map((documentList, index) => {
//         const url = "https://pdfobject.com/pdf/sample.pdf";
//         return (
//           <div key={index} className="">
//             <Card className="flex justify-between px-2 m-2 rounded-md ">
//               <CardHeader>
//                 <CardTitle>{documentList.documentName}</CardTitle>
//               </CardHeader>
//               <Dialog>
//                 <DialogTrigger asChild={true} className="w-32 mt-3">
//                   <Button variant="outline">View</Button>
//                 </DialogTrigger>
//                 <DialogContent className="flex items-center justify-center h-[calc(100vh - 64px)] w-full">
//                   <PDFViewer file={url} />
//                 </DialogContent>
//               </Dialog>
//             </Card>
//           </div>
//         );
//       })}
//       <AlertDialog>
//         <AlertDialogTrigger>Open</AlertDialogTrigger>
//         <AlertDialogContent className="fixed z-50 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
//           <AlertDialogHeader>
//             <AlertDialogDescription className="mt-3 w-full h-[500px]">
//               <PDFViewer file={"https://pdfobject.com/pdf/sample.pdf"} />
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel className="z-40">Cancel</AlertDialogCancel>
//             <AlertDialogAction>Continue</AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </>
//   );
// };

// export default DialogPDF;
