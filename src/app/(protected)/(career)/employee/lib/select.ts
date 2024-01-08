import { useSelect, type BaseOption } from "@refinedev/core";
import { type IPosition } from "@src/app/(protected)/(career)/branch/interface";
import { type IProfile } from "../interface";

export const useGraduationSelect = () => {
  const profile = useSelect<IProfile>({
    resource: "profile",
    optionLabel: "fullname",
    optionValue: "id",
  });
  const options = profile.queryResult.data?.data.map((item) => ({
    label: `${item.fullname} - ${item.nickname}`,
    value: item.id,
  }));
  profile.options = options as BaseOption[];
  return profile;
};

export const usePositionSelect = () => {
  const position = useSelect<IPosition>({
    resource: "position",
    optionLabel: "name",
    optionValue: "id",
  });
  return position;
};
