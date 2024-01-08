import React from "react";
import { PersonalAddressForm } from "../components/form";


export default {
  title: "Personal/address/PersonalAddressCreate",
  component: PersonalAddressForm,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/sector",
      },
    },
  },
};

export const create = () => (
  <PersonalAddressForm redirect={false} setCurrentStep={undefined}/>
);
