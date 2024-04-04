import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { useApplicationContext } from "../../../application/context";
import * as z from "zod";
import { WorkExperienceSchema } from "../../../work-experience/containers/form/validation";

export const useFormConfig = () => {
  const { state } = useApplicationContext();
  const { ...form } = useForm<{ id?: number }>({
    resolver: zodResolver(WorkExperienceSchema),
    refineCoreProps: {
      resource: "skill",
      redirect: false,
    },
    warnWhenUnsavedChanges: true,
  });
  return { form, state };
};

export const Schema = z.object({
  skill:
    z.array(
      z.object({
        name: z.string().min(1, {
          message: "ກະລຸນາປ້ອນຊື່ບໍລິສັດ",
        }),
        proficiency: z.string().min(1, {
          message: "ກະລຸນາປ້ອນຕໍາແໜ່ງ",
        }),
        // application: z.string().min(1, {
        //   message: "ກະລຸນາລາຍະເວລາທີເຮັດວຽກ",
        // }),
      }),
    ),
}).transform((val) => {
  console.log("state", val);

  console.log("val", val);
  const List = val.skill;
  return List;
});
