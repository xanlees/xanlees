"use client";

import { useShow } from "@refinedev/core";
import { Show } from "@/shadcn/components/crud";
import type { IApplication, IWorkExperience, IProfile } from "../../interface";
import { Card, CardContent } from "@src/shadcn/elements";
import { AvatarCard, Applied, PersonalInformation, SkillSection, generateTechnicalSkills, generateLanguageSkills, WorkExperience, DocumentList, EducationList } from "../../containers/show";
import { useDocument, useEducation, useProfile } from "../../hooks";

export default function ApplicationShow({ params }: { params: { id: number } }): JSX.Element {
  const { queryResult } = useShow<IApplication>();
  const { data } = queryResult;
  const record: IApplication | undefined = data?.data;
  const application = record?.id ?? 0;
  const { fullname = "", profilePicture = "", id } = (record?.profileId as IProfile) ?? {};
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const { data: dataWorkExperience } = ({ applicationID: application }) as unknown as { data: IWorkExperience[] };
  const { data: documentData } = useDocument({ profileID: id });
  const { data: educationData } = useEducation({ profileID: id });
  const { data: physicalProfile } = useProfile({ profileID: id });
  return (
    <Show>
      <div className="flex-row gap-2 p-2 sm:flex">
        <div>
          <AvatarCard title={fullname} image={profilePicture} />
          <PersonalInformation record={record} physicalProfile={physicalProfile} />
        </div>
        <div className="w-full space-y-2">
          <Card className="w-full p-2 rounded-sm sm:w-full md:w-full">
            <CardContent className="p-2 rounded-sm">
              <Applied header="ສະໝັກຕໍາແໜ່ງ" record={record} />
              <SkillSection header="ທັກສະໃຊ້ຄວາມພິວເຕີ" skills={generateTechnicalSkills(record)} />
              <SkillSection header="ທັກສະພາສາຕ່າງປະເທດ" skills={generateLanguageSkills(record)} />
              <WorkExperience header="ປະສົບການເຮັດວຽກ" dataWorkExperience={dataWorkExperience} />
              <EducationList header="ການສຶກສາ" educationData={educationData} />
            </CardContent>
          </Card>
          <DocumentList documentData={documentData} header={""} />
        </div>
      </div>
    </Show>
  );
}
