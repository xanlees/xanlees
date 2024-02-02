import { Card, CardDescription, CardHeader, CardTitle } from "@src/shadcn/elements";

export function AppliedReason({ title="", content="" }: { title?: string, content?: string }): JSX.Element {
    return (
      <Card className="w-full rounded-md">
        <CardHeader>
          <CardTitle className="">
            {title}
          </CardTitle>
          <CardDescription>
            {content}
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }