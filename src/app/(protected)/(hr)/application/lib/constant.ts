import { type CrudFilter } from "@refinedev/core";

export const optionsConfig = [
  { value: "New", label: "ໃຫມ່" },
  { value: "Contacted", label: "ຕິດຕໍ່ຫາແລ້ວ" },
  { value: "Interviewed", label: "ສຳພາດແລ້ວ" },
  { value: "Hired", label: "ເລືອນຂັ້ນເປັນພະນັກງານ" },
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
      return "A";
    case "B":
      return "B";
    case "C":
      return "C";
    case "D":
      return "D";
    case "E":
      return "E";
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
      return "ເລືອນຂັ້ນເປັນພະນັກງານ";
    default:
      return "";
  }
};
