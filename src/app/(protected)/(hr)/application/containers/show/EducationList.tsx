import type { IEducation } from "../../interface";

import moment from "moment";
export function EducationList({
  header,
  educationData = [] as IEducation[] | { data: IEducation[] },
}: Readonly<{ header: string, educationData?: IEducation[] | { data: IEducation[] } }>): JSX.Element {
  const educationDataArray = Array.isArray(educationData) ? educationData : educationData.data;
  return (
    <div className="flex flex-wrap">
      <div className="flex w-full h-12 mb-4 text-xl font-bold sm:w-1/4">
        {header}
      </div>
      <div className="flex flex-wrap w-full mt-2 sm:flex sm:w-1/2">
        {educationDataArray?.map((item, index) => (
          <div key={index} className="flex flex-col w-full mb-4 sm:w-1/2">
            <div className="text-lg font-semibold">{item.graduationDetail.degree}</div>
            <div className="text-md">{item.graduationDetail.sector}</div>
            <div className="text-md">{item.branch}</div>
            <div className="text-md">{moment(item.year).format("MMMM DD, YYYY")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
