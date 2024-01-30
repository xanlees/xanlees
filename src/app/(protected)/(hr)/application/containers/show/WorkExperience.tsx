"use client";

interface WorkExperienceProps {
  company: string
  position: string
  time: string
  salary: string
  reasonOfResignation: string
}

interface WorkExperienceComponentProps {
  header: string
  dataWorkExperience?: WorkExperienceProps[] | { data: WorkExperienceProps[] } | undefined
}

export function WorkExperience({
  header,
  dataWorkExperience = [] as WorkExperienceProps[] | { data: WorkExperienceProps[] },
}: WorkExperienceComponentProps): JSX.Element {
  const workExperienceData = Array.isArray(dataWorkExperience) ? dataWorkExperience : dataWorkExperience.data;

  return (
    <div className="flex flex-wrap">
      <div className="flex w-full h-12 mb-4 text-xl font-bold sm:w-1/4">
        {header}
      </div>
      <div className="flex flex-wrap w-full mt-2 sm:flex sm:w-1/2">
        {workExperienceData?.map((item, index) => (
          <div key={index} className="flex flex-col w-full mb-4 sm:w-1/2">
            <div className="text-lg font-semibold">{item.company}</div>
            <div className="text-md">{item.position}</div>
            <div className="text-sm">{item.time}</div>
            <div className="text-sm">ເງີນເດືອນ: {item.salary}</div>
            <div className="text-sm">ເຫດຜົນທີລາອອກ: {item.reasonOfResignation}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
