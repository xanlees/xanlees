import { type IGender, type MaritalStatusType } from "../interface";

export const getGenderDisplayText = (gender: IGender["gender"]): string => {
  switch (gender) {
    case "MALE":
      return "ຊາຍ";
    case "FEMALE":
      return "ຍິງ";
    case "OTHER":
      return "ອື່ນໆ";
    default:
      return "ບໍ່ຮູ້ເພດ";
  }
};

export const getMaritalStatusDisplayText = (maritalStatus: MaritalStatusType): string => {
  switch (maritalStatus) {
    case "SINGLE":
      return "ໂສດ";
    case "MARRIED":
      return "ແຕ່ງງານແລ້ວ";
    default:
      return "ບໍ່ຮູ້ເພດ";
  }
};
