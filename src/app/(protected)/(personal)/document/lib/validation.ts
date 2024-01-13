/* eslint-disable @typescript-eslint/naming-convention */
import * as z from "zod";

export const documentFormSchema = z.array(
  z.object({
    document_name: z.string(),
    profile_id: z.number(),
    document_file: z.string(),
  }),
);
