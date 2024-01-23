/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import type { IApplication } from "../interface";

export function useApplicationID(application: IApplication[]) {
  return application.flatMap((item) => (item?.id !== undefined ? [item.id] : [0]));
}
