"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const ProfileCreate = () => {
  useEffect(() => {
    redirect("/user/create/0/profile");
  }, []);
  return null;
};

export default ProfileCreate;
