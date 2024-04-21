"use client";
import React from "react";
import { Create } from "@/shadcn/components/crud";
import { UserForm } from "../../containers/form";

export default function UserCreate({ params }: { params: { id: number } }): JSX.Element {
  const profile = Number(params.id);
  return (
    <Create>
      <UserForm redirect="list" profile={profile ?? 0}/>
    </Create>
  );
}

