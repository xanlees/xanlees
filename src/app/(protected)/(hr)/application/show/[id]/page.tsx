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
import { useApplicationBranch } from "../../hooks";
import { type IBranch } from "@src/app/(protected)/(career)/sector/useSelect";

export default function ApplicationShow({ params }: Readonly<{ params: { id: number } }>): JSX.Element {
  const { queryResult } = useShow<IApplication>({});
  const { data } = queryResult;
  const record = data?.data as IApplication;
  const profileId = Number(record?.profileId ?? 0) ?? 0;
  const { data: profileData } = useProfile<IProfile>({ profileId: record?.profileId });
  const { data: branchData } = useApplicationBranch<IBranch>({ id: record?.branchId });
  const { data: workExperienceData } = useWorkExperience<IWorkExperience[]>({ application: record?.id });
  const { data: skillData } = useSkill<ISkill[]>({ application: record?.id });
  const { data: physicalData } = usePhysical<IPhysical[]>({ profileId: record?.profileId });
  return (
    <Show showButtonEdit={false}>
      <div className="mt-5 flex flex-wrap justify-between gap-2">
        <div className="space-y-2 w-80">
          <ProfileDetail profileData={profileData} visible={false} />
          <Physical physicalData={physicalData as IPhysical[]} />
        </div>
        <div className="space-y-2 w-80">
          <DocumentPDF profileId={profileData?.[0]?.id ?? 0}/>
          <Skill skillData={skillData as ISkill[]} />
          <Application applicationData={record} branchData={branchData}/>
        </div>
        <div className="flex flex-col gap-y-2 w-80">
          <EducationDetail profileId={profileId} />
          <WorkExperience workExperienceData={workExperienceData as IWorkExperience[]} />
          <AddressDetail profileId={profileId} />
        </div>
      </div>
    </Show>
  );
}

