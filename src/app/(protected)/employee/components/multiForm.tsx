/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
import { useStepsForm } from "@refinedev/react-hook-form";
import { Button } from "@src/shadcn/ui";
import { Input } from "@/shadcn/ui";
import { Form } from "@/shadcn/components/form";
import { formSchema } from "../validation/validation";
import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const stepTitles = ["Step One", "Step Two", "Step Three"];

export const MultiStepForm: React.FC = () => {
  const { ...form } = useStepsForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      test: "",
    },
    refineCoreProps: {
      autoSave: {
        enabled: true,
      },
    },
    warnWhenUnsavedChanges: true,
  });
  const {
    steps: { currentStep, gotoStep },
  } = form;
  const renderFormByStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Form {...form}>
            <Form.Field {...form} name="test" label="test">
              <Input placeholder="test" />
            </Form.Field>
          </Form>
        );
      case 1:
        return (
          <Form {...form}>
            <Form.Field {...form} name="test01" label="test01">
              <Input placeholder="test01" />
            </Form.Field>
          </Form>
        );
      case 2:
        return null;
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-xl sm:p-7 dark:bg-slate-900">
      <div className="flex justify-center w-full gap-2">
        {stepTitles.map((title, index) => (
          <Button
            onClick={() => {
              gotoStep(index);
            }}
            className={`${
              currentStep === index ? "bg-white text-black w-full" : "w-full"
            }`}
          >
            {title}
          </Button>
        ))}
      </div>
      <form autoComplete="off">{renderFormByStep(currentStep)}</form>
      <div className="flex justify-end gap-3">
        {currentStep > 0 && (
          <Button
            onClick={() => {
              gotoStep(currentStep - 1);
            }}
          >
            Previous
          </Button>
        )}
        {currentStep < stepTitles.length - 1 && (
          <Button
            onClick={() => {
              gotoStep(currentStep + 1);
            }}
          >
            Next
          </Button>
        )}
        {currentStep === stepTitles.length - 1 && <Button>Save</Button>}
      </div>
    </div>
  );
};
