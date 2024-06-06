import * as z from "zod";

interface IValidateImageSchemaProps {
  required: boolean
  message?: string
}

const acceptedImageTypes = [
  "image/jpg",
  "image/jpeg",
  "image/png",
];

const maxFileSize = 10000000;

const validateFile = (file: File | null | undefined): boolean => {
  if (!file) {
    return true;
  }
  return file.size <= maxFileSize && acceptedImageTypes.includes(file.type);
};

export const validateImageSchema = ({ required = true, message = "Image is required." }: IValidateImageSchemaProps) => {
  const schema = (z.any() as z.ZodType<File>)
    .refine((file) => validateFile(file), {
      message: "ຂະໜາດຮູບບໍ່ເກີນ 10MB ແລະ ປະເພດຮູບບໍ່ເກີດ .jpg, .jpeg, .png",
    });
  if (required) {
    return schema.refine((file) => file != null, {
      message,
    });
  }
  return schema.optional().nullable();
};
