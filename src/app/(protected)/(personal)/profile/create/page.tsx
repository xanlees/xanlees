"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const ProfileCreate = () => {
  useEffect(() => {
    redirect("/user/create");
  }, []);
  return null;
};

export default ProfileCreate;
