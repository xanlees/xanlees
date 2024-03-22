import { type BaseOption, useSelect } from "@refinedev/core";
import { type IGraduation } from "@personal";

export const useGraduationSelect = () => {
  const graduation = useSelect<IGraduation>({
    resource: "graduation",
    optionLabel: "degree",
    optionValue: "id",
  });
  const options = graduation.queryResult.data?.data.map((item) => ({
    label: `${item.degree} - ${item.sector}`,
    value: item.id,
  }));
  graduation.options = options as BaseOption[];
  return graduation;
};
