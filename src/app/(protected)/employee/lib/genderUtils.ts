import { type IGender, type MaritalStatusType } from "../interface";

export const getGenderDisplayText = (gender: IGender["gender"]): string => {
  switch (gender) {
    case "MALE":
      return "ຜູ້ຊາຍ";
    case "FEMALE":
      return "ຜູ້ຍິ";
    case "OTHER":
      return "ອື່ນໆ";
    default:
      return "ບໍ່ຮູ້ເພດ";
  }
};

export const getMaritalStatusDisplayText = (
  maritalStatus: MaritalStatusType,
): string => {
  switch (maritalStatus) {
    case "SINGLE":
      return "ໂສດ";
    case "MARRIED":
      return "ແຕ່ງງານແລ້ວ";
    case "DIVORCED":
      return "ຢ່າຮ້າງ";
    case "WIDOWED":
      return "ແມ່ໝ້າຍ";
    default:
      return "ບໍ່ຮູ້ເພດ";
  }
};
