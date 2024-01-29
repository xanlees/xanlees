"use client";
import { Create } from "@/shadcn/components/crud";
import { PositionCreate } from "../components/positionCreate";
export default function BranchCreate(): JSX.Element {
  return (
    <Create>
      <PositionCreate redirect="edit" />
    </Create>
  );
}
