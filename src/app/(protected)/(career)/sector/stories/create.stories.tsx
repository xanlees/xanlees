import React from "react";
import { FormSector } from "../components/form/form";


export default {
  title: "Career/sector/sectorCreate",
  component: FormSector,
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
  <FormSector redirect={false}/>
);
