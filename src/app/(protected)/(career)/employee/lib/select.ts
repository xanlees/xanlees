import { useSelect } from "@refinedev/core";
import { type IPosition } from "@src/app/(protected)/(career)/branch/interface";

export const usePositionSelect = () => {
  const position = useSelect<IPosition>({
    resource: "position",
    optionLabel: "name",
    optionValue: "id",
  });
  return position;
};
