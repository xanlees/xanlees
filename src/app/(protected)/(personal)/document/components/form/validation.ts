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
        profileId: z.number(),
        documentFile: (z.any() as z.ZodType<FileList>).refine(
          (fileList) => {
            const file = fileList?.[0];
            return file != null && file.type === "application/pdf";
          },
          {
            message: "ກະລຸນາໃສ່ເອກກະສານ PDF",
          },
        ),
      }),
    ),
  })
  .refine((data) => data.document.length > 0, {
    message: "ກະລຸນາເພີ່ມເອກະສານ",
    path: ["documentList"],
  })
  .transform((val) => transformDocumentDataListToRecord(val.document));
