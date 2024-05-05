import { type IPosition } from "../position/interface";
import { type IBranch } from "./interface";

export function getDisplayBranchName(type: string) {
  switch (type) {
    case "HEADQUARTERS":
      return "ສໍານັກງານໃຫຍ່";
    case "OFFICE":
      return "ຫ້ອງການ";
    case "BRANCH":
      return "ສາຂາ";
    case "LOTTERY":
      return "ຫວຍ";
    default:
      return "";
  }
}

export function getSectorTypeName(type: string) {
  switch (type) {
    case "Sector":
      return "ຂະແໜງ";
    case "Department":
      return "ພະແນກ";
    case "Unit":
      return "ໜ່ວຍບໍລິການ";
    default:
      return "";
  }
}

export function getBranchIds(branch: IBranch[]) {
  const branchIDs = branch.map((item) => item.id);
  if (branchIDs) {
    return branchIDs;
  }
  return [];
}

export function getPositionIds(positionData: IPosition[]) {
  const positionI = positionData.map((item) => item.id);
  if (positionI) {
    return positionI;
  }
  return [];
}
