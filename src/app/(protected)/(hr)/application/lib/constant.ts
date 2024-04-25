import { type CrudFilter } from "@refinedev/core";

export const optionsConfig = [
  { value: "New", label: "ໃຫມ່" },
  { value: "Contacted", label: "ຕິດຕໍ່" },
  { value: "Interviewed", label: "ສຳພາດແລ້ວ" },
  { value: "Hired", label: "ຈ້າງເປັນພະນັກງານແລ້ວ" },
];

export const applicationResource = "application";

export const initialFilters: CrudFilter[] = [
  {
    field: "application_status",
    operator: "eq",
    value: "Hired",
  },
  {
    field: "expand",
    operator: "eq",
    value: "profile_id",
  },
];

export const refineCoreProps = {
  applicationResource,
  filters: {
    initial: initialFilters,
  },
};

export const getTypeDrivingLicenseLabel = (typeDrivingLicense: string | null | undefined): string => {
  switch (typeDrivingLicense) {
    case "A":
      return "ປະເພດ A";
    case "B":
      return "ປະເພດ B";
    case "C":
      return "ປະເພດ C";
    case "D":
      return "ປະເພດ D";
    case "E":
      return "ປະເພດ E";
    case "NO_LICENSE":
      return "ບໍ່ມີໃບຂັບຂີ່";
    default:
      return "";
  }
};

export const getTypeVaccineLabel = (typeVaccine: string | null | undefined): string => {
  switch (typeVaccine) {
    case "Motorcycle":
      return "ລົດຈັກ";
    case "Car":
      return "ລົດຈັດໃຫຍ່";
    case "Truck":
      return "ລົດບັນທຸກ";
    case "Cannot Drive":
      return "ບໍ່ສາມາດຈັກລົດ";
    default:
      return "";
  }
};

export const getApplicationStatusLabel = (applicationStatus: string | null | undefined): string => {
  switch (applicationStatus) {
    case "New":
      return "ສົ່ງເຂົ້າມາໃຫມ່";
    case "Contacted":
      return "ຕິດຕໍ່ຫາແລ້ວ";
    case "Interviewed":
      return "ສຳພາດແລ້ວ";
    case "Hired":
      return "ຈ້າງເປັນພະນັກງານແລ້ວ";
    default:
      return "";
  }
};
