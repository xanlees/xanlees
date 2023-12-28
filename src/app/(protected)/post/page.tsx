/* eslint-disable @typescript-eslint/naming-convention */
"use client";

import React from "react";
import Card from "./lib/card";
import TableSkeleton from "./lib/table";
import { EmployeeContainer, CardSection } from "./employeeLayout";

export default function Post(): JSX.Element {
  return (
    <EmployeeContainer>
      <CardSection>
        <Card />
      </CardSection>
      <CardSection>
        <TableSkeleton />
      </CardSection>
    </EmployeeContainer>
  );
}
