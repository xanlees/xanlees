import { ErrorMapMessage } from "../interface";

export interface IErrorMessageNotification {
    responseData: any;
    errorMessages: ErrorMapMessage[];
    defaultMessage: string;
}

export const getErrorMessageNotification = ({
    responseData,
    errorMessages,
    defaultMessage,
}: IErrorMessageNotification) => {
    let errorMessage: string = defaultMessage;
    for (const key in responseData) {
        if (Object.hasOwn(responseData, key)) {
            const errorMap = errorMessages.find(
                (e) => e.val === responseData[key][0]
            );
            if (errorMap) {
                errorMessage = errorMap.message;
                break;
            }
        }
    }
    return { message: errorMessage, description: "", type: "error" as const };
};
