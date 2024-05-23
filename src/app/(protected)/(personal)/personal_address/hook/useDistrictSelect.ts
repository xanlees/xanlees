import { useSelect } from "@refinedev/core";
interface IDistrict {
  provinceName: string
  districtName: string
  id: number
}

export const useDistrictSelect = ({ province }: { province?: string }) => {
  const provinceName = province ?? "";
  return useSelect<IDistrict>({
    resource: "district",
    optionLabel: "districtName",
    optionValue: "id",
    filters: [
      {
        field: "provinceName",
        operator: "eq",
        value: String(provinceName),
      },
      {
        field: "paginate",
        operator: "eq",
        value: false,
      },
    ],
  });
};

export const useProvinceSelect = () => {
  return useSelect<IDistrict>({
    resource: "district",
    optionLabel: "provinceName",
    optionValue: "id",
    filters: [
      {
        field: "province",
        operator: "eq",
        value: "ນະຄອນຫຼວງວຽງຈັນ,ແຂວງຜົ້ງສາລີ,ແຂວງຫຼວງນໍ້າທາ,ແຂວງອຸດົມໄຊ,ແຂວງບໍ່ແກ້ວ,ແຂວງຫຼວງພະບາງ,ແຂວງຫົວພັນ,ແຂວງໄຊຍະບູລີ,ແຂວງຊຽງຂວາງ,ແຂວງວຽງຈັນ,ແຂວງບໍລິຄຳໄຊ,ແຂວງຄຳມ່ວນ,ແຂວງສະຫວັນນະເຂດ,ແຂວງສາລະວັນ,ແຂວງເຊກອງ,ແຂວງຈຳປາສັກ,ແຂວງອັດຕະປື,ແຂວງໄຊສົມບູນ",
      },
      {
        field: "paginate",
        operator: "eq",
        value: false,
      },
    ],
  });
};

