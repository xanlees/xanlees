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
        documentName: z.string(),
        profileId: z.number(),
        documentFile: (z.any() as z.ZodType<FileList>).refine(
          (fileList) => {
            const file = fileList?.[0];
            return file != null;
          },
        ),
      }),
    ),
  })
  .transform((val) => transformDocumentDataListToRecord(val.document));
