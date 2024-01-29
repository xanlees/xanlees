import * as z from "zod";

export interface IApplication {
  profileId: number;
  emergencyFullname: string;
  emergencyRelationship: string;
  emergencyPhoneNumber: string;
  typeDrivingLicense: "A" | "B" | "C" | "D" | "OTHER";
  typeVaccine: string;
  wordSkill: "Poor" | "Fair" | "Good" | "Excellent";
  excelSkill: "Poor" | "Fair" | "Good" | "Excellent";
  powerpointSkill: "Poor" | "Fair" | "Good" | "Excellent";
  thaiSkill: "Poor" | "Fair" | "Good" | "Excellent";
  englishSkill: "Poor" | "Fair" | "Good" | "Excellent";
  chineseSkill: "Poor" | "Fair" | "Good" | "Excellent";
  vietnameseSkill: "Poor" | "Fair" | "Good" | "Excellent";
  pledgeReason: string;
  appliedReason: string;
  applicationStatus: string;
  applicantSignature: boolean;
  positionAppliedFor: string;
  expectedSalary: string;
}

function transformApplication(val: IApplication): Record<string, any> {
  return {
    ...val,
    expectedSalary: Number(val.expectedSalary)
  };
}

export const applicationSchema = z.object({
  profileId: z.number(),
  emergencyFullname: z.string().min(2, {
    message: "ກະລຸນາປ້ອນຂອງຊື່ກໍລະນີ້ສຸກເສີນ",
  }),
  positionAppliedFor: z.string().min(2, {
    message: "ກະລຸນາປ້ອນຕໍາແຫນ່ງທີ່ສະຫມັກ",
  }),
  expectedSalary: z.string().min(2, {
    message: "ກະລຸນາປ້ອນເງິນເດືອນທີ່ຕ້ອງການ",
  }),
  emergencyRelationship: z.string().min(2, {
    message: "ກະລຸນາປ້ອນຄວາມສາພັນ",
  }),
  emergencyPhoneNumber: z.string().min(2, {
    message: "ກະລຸນາປ້ອນເບີໂທ",
  }),
  typeDrivingLicense: z.enum(["A", "B", "C", "D", "OTHER"]),
  typeVaccine: z.enum(["Sinopharm", "AstraZeneca", "Pfizer", "Other"]),
  wordSkill: z.enum(["Poor", "Fair", "Good", "Excellent"]),
  excelSkill: z.enum(["Poor", "Fair", "Good", "Excellent"]),
  powerpointSkill: z.enum(["Poor", "Fair", "Good", "Excellent"]),
  thaiSkill: z.enum(["Poor", "Fair", "Good", "Excellent"]),
  englishSkill: z.enum(["Poor", "Fair", "Good", "Excellent"]),
  chineseSkill: z.enum(["Poor", "Fair", "Good", "Excellent"]),
  vietnameseSkill: z.enum(["Poor", "Fair", "Good", "Excellent"]),
  pledgeReason: z.string().min(2, {
    message: "ກະລຸນາປ້ອນເຫດຜົນທ່ານຈື່ງຢາກເຮັດວຽກກັບພວກເຮົາ",
  }),
  appliedReason: z.string().min(2, {
    message: "ຖ້າໄດ້ເປັນພະນັກງານຂອງ ເອັສບີເອັສ ແລ້ວທ່ານຈະປະຕິຍານຕົນແນວໃດ",
  }),
  applicationStatus: z.string(),
  applicantSignature: z.boolean(),
}).transform((val) => transformApplication(val));
