
import { Button, Card } from "@src/shadcn/elements";
import { BadgeCheck } from "lucide-react";

export const Success = () => {
  const handleButtonClick = () => {
    localStorage.removeItem("creatingApplication");
    localStorage.removeItem("creatingProfileState");
    window.location.reload();
  };

  return (
    <Card className="w-full sm:w-[39%] rounded-md border-dashed p-2 flex-row">
      <div className="bg-white md:mx-auto">
        <BadgeCheck className="justify-center mx-auto h-14 w-14 bg-geen-500 " color="#004cff" />
        <div className="overflow-y-auto text-center">
          <h3 className="text-base font-semibold text-center text-gray-900 md:text-2xl">ສົ່ງແບບຟອມສະໝັກສໍາເລັດ!</h3>
          <p className="my-2 text-gray-600">ຂອບໃຈ ທີ່ມາສະໝັກວຽກສະມັກກັບພວກເຮົາ</p>
        </div>
      </div>
      <div className="text-center">
        <Button onClick={handleButtonClick}>ກັບຄືນໜ້າຫຼັກ</Button>
      </div>
    </Card>
  );
};
