import { useLogin } from "@refinedev/core";
import { type ILoginVariables } from "../interface/interface";

function useSubmitService() {
  const { mutate: login } = useLogin();
  return (formData: ILoginVariables) => {
    login(formData);
  };
}

export default useSubmitService;
