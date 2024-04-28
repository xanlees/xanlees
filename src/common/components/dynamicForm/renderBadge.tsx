/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from "react";
import { Badge } from "@src/shadcn/elements";
import { X } from "lucide-react";
import { cn } from "@src/lib/utils";
import {
  type Control,
  type FieldValues,
  type UseFormSetValue,
  type UseFormWatch,
} from "react-hook-form";

export interface IFormConfig {
  setValue?: UseFormSetValue<FieldValues>
  watch?: UseFormWatch<FieldValues>
  control?: Control<FieldValues>
}

interface Field {
  id: FieldValues
  [key: string]: FieldValues
}

interface RenderBadgeProps {
  remove: (index: number) => void
  name: string
  form: IFormConfig
  className?: string
}

const renderFieldValue = (value: FieldValues): string => {
  if (typeof value === "object" && value !== null) {
    return Object.values(value).join(", ");
  }
  return String(value);
};

export const RenderBadge: React.FC<RenderBadgeProps> = ({ remove, name, form, className }) => {
  const formArray: Field[] =
    form.watch?.(name)?.map((value: FieldValues) => ({
      [name]: value,
      id: `id-${Math.random()}`,
    })) ?? [];
  return (
    <div className={cn("", className)}>
      {formArray?.map((field: Field, index: number) => (
        <div className="inline-flex items-center w-full gap-2 p-2 m-1 rounded">
          <Badge className="flex justify-between w-full text-white rounded-sm">
            <div className="flex py-1 mx-1 text-base border-0 gap-x-2 ">
              <div className="">{index + 1}</div>
              <div className="">
                {renderFieldValue(field[name])}
              </div>
            </div>
            <button
              onClick={() => {
                remove(index);
              }}
              type="button"
              className="text-lg place-self-center "
            >
              <X size={20} />
            </button>
          </Badge>
        </div>
      ))}
    </div>
  );
};
