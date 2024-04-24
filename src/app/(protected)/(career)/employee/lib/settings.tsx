import { EmployeeForm } from "../containers/form/createForm";

export const formStepsData = [
  {
    stepLabel: "Create Employee",
    stepDescription: <EmployeeForm redirect="create" />,
    completed: false,
  },
];
