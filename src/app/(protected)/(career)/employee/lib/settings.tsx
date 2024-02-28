import { EmployeeForm } from "../components/form";

export const formStepsData = [
  {
    stepLabel: "Create Employee",
    stepDescription: <EmployeeForm redirect="create" id={0} />,
    completed: false,
  },
];
