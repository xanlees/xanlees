import { EmployeeForm } from "../components/form";

export const createEmployeeSteps = [
  {
    stepLabel: "Create Employee",
    stepDescription: <EmployeeForm redirect="create" />,
    completed: false,
  },
];
