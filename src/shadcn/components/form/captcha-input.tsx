import { loadCaptchaEnginge, LoadCanvasTemplate } from "react-simple-captcha";
import { useEffect } from "react";
import { Input } from "@src/shadcn/elements";

const CaptchaLength = 4;
const Captcha = ({ ...props }) => {
  useEffect(() => {
    loadCaptchaEnginge(CaptchaLength, "blue", "white");
  }, []);
  return (
    <div className="flex flex-row gap-4">
      <div className="w-52">
        <Input type="text" id="captcha" name="captcha" placeholder="Enter the Captcha" {...props}/>
      </div>
      <div className="my-2.5">
        <LoadCanvasTemplate reloadText="ໂຫຼດໃໝ່" reloadColor="red" />
      </div>
    </div>
  );
};

export default Captcha;
