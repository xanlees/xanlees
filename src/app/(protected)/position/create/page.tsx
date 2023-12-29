"use client";

import { Create } from "@/shadcn/components/crud";
import { CounterProvider } from "../components/counterContext";
import { PositionCreate } from "../components/positionCreate";

export default function UserCreate(): JSX.Element {
  return (
    <Create>
      <CounterProvider>
        <PositionCreate />
      </CounterProvider>
    </Create>
  );
}
