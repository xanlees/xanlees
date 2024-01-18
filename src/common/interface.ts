export interface IFormConfig {
  form: {
    setValue: any
  }
}

export const formConfig = {
  headers: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "content-type": "multipart/form-data",
  },
};
