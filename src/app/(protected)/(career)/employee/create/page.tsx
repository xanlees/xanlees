"use client";

import { redirect } from "next/navigation";

export default function EmployeeCreate(): JSX.Element {
  redirect("/profile/create");
}
