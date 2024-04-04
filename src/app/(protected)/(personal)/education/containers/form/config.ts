/* eslint-disable max-lines-per-function */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { graduationSchema } from "./validation";
import { useProfileContext } from "../../../context";
import { type IFormConfig } from "@src/common/interface";
import { useEffect, useRef } from "react";

interface IEducationFromValue {
  id: number
}
export const useFormConfig = () => {
  const { state, dispatch } = useProfileContext();
  const profile = state.profileId ?? 0;
  const { ...form } = useForm<IEducationFromValue>({
    resolver: zodResolver(graduationSchema),
    defaultValues: {
      education: [
        {
          branch: "",
          graduationId: 0,
          profileId: state.profileId,
          year: "",
        },
      ],
    },
    refineCoreProps: {
      resource: "education",
      autoSave: {
        enabled: true,
      },
      redirect: false,
      onMutationSuccess: (data) => {
        let id: number;
        if (Array.isArray(data?.data) && data?.data.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          id = data.data[0].id ?? 0;
        } else {
          id = data?.data?.id ?? 0;
        }
        dispatch({ type: "setEducationId", payload: id });
      },
    },
    warnWhenUnsavedChanges: true,
  });
  useUpdateDefaultValues(form as any, profile);
  return { form };
};

const useUpdateDefaultValues = (form: IFormConfig, profile: number) => {
  const profileRef = useRef(profile);
  useEffect(() => {
    if (profileRef.current !== profile) {
      form.setValue("education[0].profileId", profile);
      profileRef.current = profile;
    }
  }, [profile]);
};
