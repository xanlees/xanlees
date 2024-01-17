import * as z from "zod";
export interface IApplication {
  profileId: number
  postId: number
  emergencyFullname: string
  emergencyRelationship: string
  emergencyPhoneNumber: string
  typeDrivingLicence: "A" | "B" | "C" | "D" | "OTHER"
  typeVaccine: Array<{ typeVaccine: string }>
  wordSkill: "Poor" | "Fair" | "Good" | "Excellent"
  excelSkill: "Poor" | "Fair" | "Good" | "Excellent"
  powerpointSkill: "Poor" | "Fair" | "Good" | "Excellent"
  thaiSkill: "Poor" | "Fair" | "Good" | "Excellent"
  englishSkill: "Poor" | "Fair" | "Good" | "Excellent"
  chineseSkill: "Poor" | "Fair" | "Good" | "Excellent"
  vietnameseSkill: "Poor" | "Fair" | "Good" | "Excellent"
  pledgeReason: string
  appliedReason: string
}
function transformApplication(val: IApplication): Record<string, any> {
  return {
    ...val,
    typeVaccine: Array.isArray(val.typeVaccine)
      ? val.typeVaccine.map((item) => (typeof item === "string" ? item : item.typeVaccine))
      : val.typeVaccine,
  };
}

export const applicationSchema = z.object({
  profileId: z.number(),
  postId: z.number(),
  emergencyFullname: z.string(),
  emergencyRelationship: z.string(),
  emergencyPhoneNumber: z.string(),
  typeDrivingLicence: z.enum(["A", "B", "C", "D", "OTHER"]),
  typeVaccine: z.array(
    z.object({
      typeVaccine: z.string(),
    }),
  ),
  wordSkill: z.enum(["Poor", "Fair", "Good", "Excellent"]),
  excelSkill: z.enum(["Poor", "Fair", "Good", "Excellent"]),
  powerpointSkill: z.enum(["Poor", "Fair", "Good", "Excellent"]),
  thaiSkill: z.enum(["Poor", "Fair", "Good", "Excellent"]),
  englishSkill: z.enum(["Poor", "Fair", "Good", "Excellent"]),
  chineseSkill: z.enum(["Poor", "Fair", "Good", "Excellent"]),
  vietnameseSkill: z.enum(["Poor", "Fair", "Good", "Excellent"]),
  pledgeReason: z.string(),
  appliedReason: z.string(),
}).transform((val) => transformApplication(val));
