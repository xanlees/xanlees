import { useSelect } from "@refinedev/core";
interface IDistrict {
  provinceName: string
  districtName: string
  id: number
}
export const useDistrictSelect = ({ province }: { province?: string }) => {
  return useSelect<IDistrict>({
    resource: "district",
    optionLabel: "districtName",
    optionValue: "id",
    filters: [
      {
        field: "provinceName",
        operator: "eq",
        value: String(province),
      },
      {
        field: "page_size",
        operator: "eq",
        value: 150,
      },
    ],
  });
};
