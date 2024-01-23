import { Avatar, AvatarFallback, AvatarImage, Card, CardFooter } from "@src/shadcn/elements";

interface AvatarCardProps {
  title?: string | undefined
  image?: string | undefined
}

export const AvatarCard: React.FC<AvatarCardProps> = ({ title, image }) => {
  return (
    <Card className="p-2 rounded-sm h-96 w-80">
      <Avatar className="mx-auto h-72 w-72">
        <AvatarImage src={image} alt="@shadcn" className="w-full" />
        <AvatarFallback>Avatar</AvatarFallback>
      </Avatar>
      <CardFooter className="flex justify-center mx-auto mt-2 text-xl font-semibold text-center">
        {title}
      </CardFooter>
    </Card>
  );
};

