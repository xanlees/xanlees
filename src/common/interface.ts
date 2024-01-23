/* eslint-disable @typescript-eslint/naming-convention */
export interface IFormConfig {
  form: {
    setValue: any
  }
}

interface FormHeadersConfig {
  headers: {
    "content-type": string
  }
}

export const formHeadersConfig: FormHeadersConfig = {
  headers: {
    "content-type": "multipart/form-data",
  },
};
