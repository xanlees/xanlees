"use client";

import { useShow } from "@refinedev/core";
import { Show } from "@/shadcn/components/crud";
import { type IApplication } from "../../interface";
import { Avatar, AvatarFallback, AvatarImage, Card, CardFooter, CardContent } from "@src/shadcn/elements";
import { Badge } from "@src/shadcn/elements";

export default function ApplicationShow({ params }: { params: { id: number } }): JSX.Element {
  const { queryResult } = useShow<IApplication>();
  const { data } = queryResult;
  const record: IApplication | undefined = data?.data;
  return (
    <Show>
      <div className="flex gap-2">
        <Card className="p-2 rounded-sm h-96 w-80">
          <Avatar className="mx-auto h-72 w-72">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="w-full" />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
          <CardFooter className="flex justify-center mx-auto mt-2 text-xl font-semibold text-center">
            {"Thavisouk MINALAVONG"}
          </CardFooter>
        </Card>
        <Card className="p-2 rounded-sm ">
          <CardContent className="p-2 rounded-sm " >
            ສະໝັກຕໍາແໜ່ງ
          </CardContent>
        </Card>
      </div>
    </Show>
  );
}

