/* eslint-disable max-lines-per-function */
"use client";

import { useShow } from "@refinedev/core";
import { Show } from "@/shadcn/components/crud";
import type { IApplication } from "../../interface";
import { ProfileDetail, useProfile } from "@src/app/(protected)/(career)";
import { type IProfile } from "@src/app/(protected)/(career)/agent/interface/model";

export default function ApplicationShow({ params }: Readonly<{ params: { id: number } }>): JSX.Element {
  const { queryResult } = useShow<IApplication>();
  const { data } = queryResult;
  const record = data?.data as IApplication;
  const { data: profileData } = useProfile<IProfile>({ profileId: record?.profileId });

  // const application = record?.id ?? 0;
  // const profileId = record?.profileId as unknown as BaseKey;
  // const { data: profileData } = useOne<IProfile>({ resource: "profile", id: profileId });
  // const { fullname = "", profilePicture = "", id, personalAddressId } = profileData?.data as unknown as IProfile ?? {};
  // const { data: personalAddressData } = useOne<IPersonalAddress>({ resource: "personal_address", id: personalAddressId });
  // const workExperience = filterWorkExperience({ applicationID: application });
  // const dataWorkExperience = useWorkExperience<IWorkExperience>({ resource: "work_experience", filters: workExperience });
  // const { data: documentData } = useDocument({ profileID: id });
  // const { data: educationData } = useEducation({ profileID: id });
  // const { data: physicalProfile } = useProfile({ profileID: id });

  // const { data: profileData } = useProfile<IProfile>({ profileId: params.id });
  // const { data: employeeData } = useEmployees<IEmployee>({ profileId: params.id });
  // const { data: educationData } = useEducation<IEducation[]>({ profileId: params.id });
  // const { data: personalAddressData } = usePersonalAddress<IAddress[]>({ profileId: params.id });
  // const sectorId = useSectorId(employeeData as IEmployee[]);
  // const { data: sectorData } = useSector<ISector>({ sectorId });
  return (
    <Show>
      <div className="flex-row gap-2 mt-5 md:flex">
        <div className="space-y-2">
          <ProfileDetail profileData={profileData} visible={false} />
          {/* <DocumentPDF profileId={params?.id}/> */}
        </div>
        <div className="space-y-2 ">
          {/* <EmployeeDetail employeeData={employeeData} sectorData={sectorData}/> */}
          {/* <EducationDetail educationData={educationData as IEducation[]} /> */}
        </div>
        <div className="my-2 sm:my-0">
          {/* <AddressDetail personalAddressData={personalAddressData as IAddress[]} /> */}
        </div>
      </div>
    </Show>
  );
}

