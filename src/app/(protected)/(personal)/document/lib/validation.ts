import * as z from "zod";

interface IDocument {
  documentName: string
  profileId: number
  documentFile: FileList
}

function transformedData(data: IDocument[]): Record<string, any> {
  // eslint-disable-next-line max-params
  return data.reduce<Record<string, any>>((acc, item, index) => {
    acc[`documentName[${index}]`] = [item.documentName];
    acc[`profileId[${index}]`] = [item.profileId];
    acc[`documentFile[${index}]`] = item.documentFile;
    return acc;
  }, {});
}

export const documentFormSchema = z
  .object({
    document: z.array(
      z.object({
        documentName: z.string(),
        profileId: z.number(),
        documentFile: (z.any() as z.ZodType<FileList>).refine((fileList) => {
          const file = fileList?.[0];
          return file;
        }),
      }),
    ),
  })
  .transform((val) => {
    const documentList = transformedData(val.document);
    return documentList;
  });
