"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const EmployeeCreate = () => {
  useEffect(() => {
    redirect("/profile");
  }, []);
  return null;
};

export default EmployeeCreate;
