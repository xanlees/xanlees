import { type ErrorMapMessage } from "../interface";

export interface IErrorMessageNotification {
  responseData: Record<string, any>
  errorMessages: ErrorMapMessage[]
  defaultMessage: string
}

export const getErrorMessageNotification = ({
  responseData,
  errorMessages,
  defaultMessage,
}: IErrorMessageNotification) => {
  let errorMessage: string = defaultMessage;

  for (const key in responseData) {
    if (!Object.prototype.hasOwnProperty.call(responseData, key)) {
      continue;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const errorMap = errorMessages.find((e) => e.val === responseData[key][0]);
    if (errorMap != null) {
      errorMessage = errorMap.message;
      break;
    }
  }

  return {
    message: errorMessage,
    description: "",
    type: "error" as const,
  };
};
