"use client";
export function hasValid(value: number | null | undefined | boolean) {
  return value !== undefined && value != null && value !== 0 && value !== false;
}
