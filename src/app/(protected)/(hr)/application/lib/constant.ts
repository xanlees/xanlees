import { CrudFilter } from "@refinedev/core";

export const optionsConfig = [
    { value: "New", label: "ໃຫມ່" },
    { value: "Contacted", label: "ຕິດຕໍ່" },
    { value: "Interviewed", label: "ສຳພາດແລ້ວ" },
    { value: "Hired", label: "ຈ້າງເປັນພະນັກງານແລ້ວ" }
];

export const application_resource = "application";


export const initialFilters: CrudFilter[] = [
  {
    field: "application_status",
    operator: "eq",
    value: "Hired",
  },
];

export const refineCoreProps = {
    application_resource,
  filters: {
    initial: initialFilters,
  }
};