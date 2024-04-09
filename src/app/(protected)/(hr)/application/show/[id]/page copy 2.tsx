/* eslint-disable max-lines-per-function */
"use client";

import { useShow, useOne, type BaseKey } from "@refinedev/core";
import { Show } from "@/shadcn/components/crud";
import type { IApplication, IWorkExperience, IProfile, IPersonalAddress } from "../../interface";
import { Card, CardContent } from "@src/shadcn/elements";
import { AvatarCard, Applied, PersonalInformation, SkillSection, generateTechnicalSkills, generateLanguageSkills, WorkExperience, DocumentList, EducationList, AppliedReason } from "../../containers/show";
import { filterWorkExperience, useDocument, useEducation, useProfile, useWorkExperience } from "../../hooks";
import { Address } from "../../containers/show/Address";

export default function ApplicationShow({ params }: Readonly<{ params: { id: number } }>): JSX.Element {
  const { queryResult } = useShow<IApplication>();
  const { data } = queryResult;
  const record: IApplication | undefined = data?.data;
  const application = record?.id ?? 0;
  const profileId = record?.profileId as unknown as BaseKey;
  const { data: profileData } = useOne<IProfile>({ resource: "profile", id: profileId });
  const { fullname = "", profilePicture = "", id, personalAddressId } = profileData?.data as unknown as IProfile ?? {};
  const { data: personalAddressData } = useOne<IPersonalAddress>({ resource: "personal_address", id: personalAddressId });
  const workExperience = filterWorkExperience({ applicationID: application });
  const dataWorkExperience = useWorkExperience<IWorkExperience>({ resource: "work_experience", filters: workExperience });
  const { data: documentData } = useDocument({ profileID: id });
  const { data: educationData } = useEducation({ profileID: id });
  const { data: physicalProfile } = useProfile({ profileID: id });
  return (
    <Show>
      <div className="flex-row gap-2 p-2 sm:flex">
        <div>
          <AvatarCard title={fullname} image={profilePicture} />
          <PersonalInformation data={profileData?.data} physicalProfile={physicalProfile} record={record} personalAddressData={personalAddressData?.data}/>
        </div>
        <div className="w-full space-y-2">
          <Card className="w-full p-2 rounded-sm sm:w-full md:w-full">
            <CardContent className="p-2 rounded-sm">
              <Applied header="ສະໝັກຕໍາແໜ່ງ" record={record} />
              <SkillSection header="ທັກສະໃຊ້ຄວາມພິວເຕີ" skills={generateTechnicalSkills(record)} />
              <SkillSection header="ທັກສະພາສາຕ່າງປະເທດ" skills={generateLanguageSkills(record)} />
              <WorkExperience header="ປະສົບການເຮັດວຽກ" dataWorkExperience={dataWorkExperience} />
              <EducationList header="ການສຶກສາ" educationData={educationData} />
              <Address personalAddressData={personalAddressData?.data} />
            </CardContent>
          </Card>
          <div className="flex-row w-full gap-2 p-2 sm:flex">
            <AppliedReason title="ຖ້າໄດ້ເປັນພະນັກງານຂອງ ເອັສບີເອັສ ແລ້ວທ່ານຈະປະຕິຍານຕົນແນວໃດ ?" content={record?.pledgeReason} />
            <AppliedReason title="ເປັນຫຍັງທ່ານຈື່ງຢາກເຮັດວຽກກັບ ວິສາຫະກິດສ່ນບຸກຄົນ ເອັສບີເອັສ" content={record?.appliedReason} />
          </div>
          <DocumentList documentData={documentData} header={""} />
        </div>
      </div>
    </Show>
  );
}

