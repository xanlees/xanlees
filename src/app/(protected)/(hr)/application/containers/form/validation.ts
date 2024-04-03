import * as z from "zod";

export interface IApplication {
  profileId: number
  emergencyFullname: string
  emergencyRelationship: string
  emergencyPhoneNumber: string
  applicationStatus: string
  appliedPosition: string
  expectedSalary: string
}

function transformApplication(val: IApplication): Record<string, any> {
  return {
    ...val,
    expectedSalary: Number(val.expectedSalary.replace(/,/g, "")),
  };
}

export const applicationSchema = z.object({
  profileId: z.number(),
  emergencyFullname: z.string().min(2, {
    message: "ກະລຸນາປ້ອນຂອງຊື່ກໍລະນີ້ສຸກເສີນ",
  }),
  appliedPosition: z.string().min(2, {
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
  applicationStatus: z.string(),
}).transform((val) => transformApplication(val));

export const applicationSelectTwoSchema = z.object({
  typeVaccine: z.string().optional().nullable(),
  typeDrivingLicense: z.string().optional().nullable(),
  pledgeReason: z.string().optional().nullable(),
  appliedReason: z.string().optional().nullable(),
  applicantSignature: z.boolean().refine((val) => val, {
    message: "ກົດຍອມຮັບຂໍ້ຕົກລົງເພື່ອໄປຕໍ່",
  }),
});
