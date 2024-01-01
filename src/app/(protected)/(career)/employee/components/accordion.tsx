import { Form } from "@src/shadcn/components/form";
import { DynamicForm } from "@src/shadcn/components/form/dynamtic-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@src/shadcn/elements/accordion";

export function AccordionDemo() {

  const { ...form } = useForm<GraduationFormValues>({
    resolver: zodResolver(graduationSchema),
    refineCoreProps: {
      resource: "graduation",
      autoSave: {
        enabled: true,
      },
      redirect,
      onMutationSuccess: (data) => {
        dispatch({ type: "SET_GRADUATION_ID", payload: data?.data?.id ?? 0 });
      },
    },
    warnWhenUnsavedChanges: true,
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "graduation",
  });
  return (
    <Accordion type="single" collapsible className="w-full ">
      <AccordionItem value="item-1">
        <AccordionTrigger></AccordionTrigger>
        <Form {...form}>
        <DynamicForm
          form={form}
          fields={fields}
          append={append}
          name="graduation"
          label="Graduation"
        >
          <ArrayField {...form} name="degree" label="Degree">
            <Input placeholder="Degree" className="block w-full" />
          </ArrayField>
          <ArrayField {...form} name="sector" label="Sector">
            <Input placeholder="Degree" className="block w-full" />
          </ArrayField>
        </DynamicForm>
      </Form>
      <Card className="p-2 mt-2 rounded-lg">
        <AccordionDemo />
      </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
