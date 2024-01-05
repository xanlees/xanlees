import { EmployeeForm } from "../container/form";

export const createEmployeeSteps = [
  {
    stepLabel: "Create Employee",
    stepDescription: <EmployeeForm redirect="create" />,
    completed: false,
  },
];
