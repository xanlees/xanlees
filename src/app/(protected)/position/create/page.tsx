"use client";

import { Create } from "@/shadcn/components/crud";
import { PositionProvider } from "../components/context";
import { PositionCreate } from "../components/positionCreate";

export default function UserCreate(): JSX.Element {
  return (
    <Create>
      <PositionProvider>
        <PositionCreate />
      </PositionProvider>
    </Create>
  );
}
