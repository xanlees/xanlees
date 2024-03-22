import * as z from "zod";
import { type IDocument } from "../../interface";

function transformDocumentItemToRecord({ documentName, profileId, documentFile }: IDocument, index: number): Record<string, any> {
  return {
    [`documentName[${index}]`]: [documentName],
    [`profileId[${index}]`]: [profileId],
    [`documentFile[${index}]`]: documentFile,
  };
}

function transformDocumentDataListToRecord(data: IDocument[]): Record<string, any> {
  return data
    .map((item, index) => transformDocumentItemToRecord(item, index))
    .reduce<Record<string, any>>((acc, transformedItem) => ({ ...acc, ...transformedItem }), {});
}

export const documentFormSchema = z
  .object({
    document: z.array(
      z.object({
        documentName: z.any() as z.ZodType<string>,
        profileId: z.number(),
        documentFile: z.any() as z.ZodType<File>,
      }),
    ),
  })
  .refine((data) => {
    if (data.document.length === 0) {
      return false;
    }
    for (const doc of data.document) {
      if (doc.documentName === undefined || doc.documentName.length < 2) {
        return false;
      }
      if (doc.documentFile === undefined || doc.documentFile.type !== "application/pdf") {
        return false;
      }
    }
    return true;
  }, {
    message: "ກະລຸນາເພີ່ມເອກະສານ ຫຼື ກະລຸນາໃສ່ຊື່ເອກະສານບາງອັນຄືນ ຫຼື ກະລຸນາອັບໂຫຼດເອກະສານບາງອັນຄືນ",
    path: ["documentList"],
  })
  .transform((val) => transformDocumentDataListToRecord(val.document as IDocument[]));
