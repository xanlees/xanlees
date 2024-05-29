import * as z from "zod";
import { type IProfile } from "@personal";

export const leaveSchema = z.object({
  holidayName: z.string().min(2, {
    message: "ກະລຸນາໃສ່ຊື່ມື້ພັກ",
  }),
  holidayDate: z.array(z.string().min(1, {
    message: "ກະລຸນາເລືອກວັນ​ທີ",
  })),
});

export interface ILeave {
  id: number
  profile: number
  leaveDate: string[]
  status: string
  detail: string
  title: string
}

export interface ILeaveExpand extends Omit<ILeave, "profile"> {
  profile: IProfile
}
