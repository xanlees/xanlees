"use client";

import { redirect } from "next/navigation";

export default function DocumentShow(): JSX.Element {
  redirect("/employee/show");
}
