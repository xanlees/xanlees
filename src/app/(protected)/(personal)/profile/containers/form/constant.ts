import { type ErrorMapMessage } from "@src/common/interface";

export const genderOptions = [
  {
    label: "ຊາຍ",
    value: "MALE",
  },
  {
    label: "ຍິງ",
    value: "FEMALE",
  },
];

export const maritalStatusOptions = [
  {
    label: "ໂສດ",
    value: "SINGLE",
  },
  {
    label: "ແຕ່ງງານແລ້ວ",
    value: "MARRIED",
  },
];

export const errorMessages: ErrorMapMessage[] = [
  {
    val: "Profile with this fullname already exists.",
    message: "ຊື່ຂອງທ່ານມີໃນລະບົບແລ້ວ",
  },
  {
    val: "Profile with this phone number already exists.",
    message: "ເບີໂທນີ້ມີໃນລະບົບແລ້ວ",
  },
];

