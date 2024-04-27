"use client";
import { Application } from "../../containers/show/Application";
import { Show } from "@/shadcn/components/crud";
import { useShow } from "@refinedev/core";
import type { IApplication } from "../../interface";
import {
  type IPhysical,
  type IProfile,
  type ISkill,
  type IWorkExperience,
  AddressDetail,
  DocumentPDF,
  EducationDetail,
  Physical,
  ProfileDetail,
  Skill,
  usePhysical,
  useProfile,
  useSkill,
  useWorkExperience,
  WorkExperience,
} from "../../../index";

export default function ApplicationShow({ params }: Readonly<{ params: { id: number } }>): JSX.Element {
  const { queryResult } = useShow<IApplication>();
  const { data } = queryResult;
  const record = data?.data as IApplication;
  const profileId = Number(record?.profileId ?? 0) ?? 0;
  const { data: profileData } = useProfile<IProfile>({ profileId: record?.profileId });
  const { data: workExperienceData } = useWorkExperience<IWorkExperience[]>({ application: record?.id });
  const { data: skillData } = useSkill<ISkill[]>({ application: record?.id });
  const { data: physicalData } = usePhysical<IPhysical[]>({ profileId: record?.profileId });
  return (
    <Show showButtonEdit={false}>
      <div className="mt-5 flex flex-wrap justify-between gap-2">
        <div className="space-y-2 w-96">
          <ProfileDetail profileData={profileData} visible={false} />
          <Physical physicalData={physicalData as IPhysical[]} />
        </div>
        <div className="space-y-2 w-96">
          <DocumentPDF profileId={profileData?.[0]?.id ?? 0}/>
          <Skill skillData={skillData as ISkill[]} />
          <Application applicationData={record}/>
        </div>
        <div className="flex flex-col gap-y-2 w-96">
          <WorkExperience workExperienceData={workExperienceData as IWorkExperience[]} />
        </div>
        <div className="flex flex-col gap-y-2 w-96">
          <EducationDetail profileId={profileId} />
          <AddressDetail profileId={profileId} />
        </div>
      </div>
    </Show>
  );
}

