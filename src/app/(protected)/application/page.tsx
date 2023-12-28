/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import React from "react";
import ApplicationForm from "./lib/form";
import ApplicationCard from "./lib/card";
import { ApplicationContainer, ApplicationSection } from "./applicationLayout";

const title = "Apply for a Job Opportunity";
export default function Application(): JSX.Element {
  return (
    <ApplicationContainer title={title}>
      <ApplicationSection>
        <ApplicationForm />
      </ApplicationSection>
      <ApplicationSection>
        <ApplicationCard />
      </ApplicationSection>
    </ApplicationContainer>
  );
}
