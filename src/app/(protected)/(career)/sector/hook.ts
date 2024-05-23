import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCustomMutation, useList } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

export const useSectorForm = ({ type, id }: { type: string, id?: number }) => {
  const action = id ? "edit" : "create";
  const router = useRouter();
  const [sectorID, setSectorID] = useState<number>(0);
  const [createPosition, setCreatePosition] = useState(false);
  const { ...form } = useForm<{ id: number }>({
    resolver: zodResolver(sectorSchema),
    defaultValues: {
      branchId: 0,
      name: "",
      type: "Unit",
    },
    refineCoreProps: {
      resource: "sector",
      redirect: false,
      action,
      id,
      onMutationSuccess: (data) => {
        if (type === "LOTTERY") {
          setSectorID(data.data.id ?? 0);
        }
        if (action === "edit") {
          router.back();
        }
        setCreatePosition(true);
      },
    },
    warnWhenUnsavedChanges: true,
  });
  if (type === "LOTTERY") {
    useCreateUserProfile({ sectorID, name: "ຫົວໜ້າໜ່ວຍ", createPosition, setCreatePosition });
    useCreateUserProfile({ sectorID, name: "ຄົນຂາຍເລກ", createPosition, setCreatePosition });
  }
  return { form };
};

export const sectorSchema = z.object({
  branchId: z.number().min(1, {
    message: "ກະລຸນາເລືອກທີຕັ້ງຫ້ອງການ",
  }),
  name: z.string().min(2, {
    message: "ກະລຸນາປ້ອນຊື່ພະແນກ",
  }),
  type: z.string().min(2, {
    message: "ກະລຸນາເລືອກປະເພດ",
  }),
});

export interface CreateUserProfileProps {
  sectorID: number
  createPosition: boolean
  setCreatePosition: Dispatch<SetStateAction<boolean>>
  name: string
}

const useCreateUserProfile = ({ sectorID, name, createPosition, setCreatePosition }: CreateUserProfileProps) => {
  const { mutate } = useCustomMutation();
  useEffect(() => {
    if (sectorID && createPosition) {
      mutate({
        url: "position",
        method: "post",
        values: {
          name,
          sectorID,
        },
      });
      setCreatePosition(false);
    }
  }, [mutate, sectorID, createPosition, setCreatePosition]);
};

interface ISectorExpandBranch {
  id: number
  branchId: {
    type: string
  }
}

export function useSectorType({ id }: { id: number }) {
  return useList<ISectorExpandBranch>({
    resource: "sector",
    filters: [
      { field: "id", operator: "eq", value: id },
      { field: "expand", operator: "eq", value: "branch_id" },
    ],
    errorNotification: false,
  });
}
