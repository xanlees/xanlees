"use client";

import { Show } from "@/shadcn/components/crud";
import {
  ProfileDetail, useProfile, Physical, AddressDetail, DocumentPDF, EducationDetail,
} from "@personal";
import type { IProfile, IPhysical } from "@personal";
import type { IApplication } from "../../interface";
import { Application } from "../../containers/show/Application";
import { usePhysical, useWorkExperience } from "../../hooks";
import { useShowApplication } from "../../hooks/useTableApplication";
import { Skill, WorkExperience } from "../../containers/show";
import { type IWorkExperience } from "../../../work-experience/interface";
import { type ISkill } from "../../../skill/interface";
import { useSkill } from "../../../skill/hook";

export default function ApplicationShow({ params }: Readonly<{ params: { id: number } }>): JSX.Element {
  const data = useShowApplication<IApplication>({ id: Number(params.id) })?.data?.[0];
  const profileId = Number(data?.profileId?.id ?? 0) ?? 0;
  const { data: profileData } = useProfile<IProfile>({ profileId: data?.profileId.id });
  const { data: workExperienceData } = useWorkExperience<IWorkExperience[]>({ application: data?.id });
  const { data: skillData } = useSkill<ISkill[]>({ application: data?.id });
  const { data: physicalData } = usePhysical<IPhysical[]>({ profileId: data?.profileId.id });
  return (
    <Show showButtonEdit={false}>
      <div className="flex flex-wrap justify-between gap-2 mt-5">
        <div className="space-y-2 w-80">
          <ProfileDetail profileData={profileData} visible={false} user={0} disabled={false}/>
          <Physical physicalData={physicalData as IPhysical[]} />
        </div>
        <div className="space-y-2 w-80">
          <DocumentPDF profileId={profileData?.[0]?.id ?? 0}/>
          <Skill skillData={skillData as ISkill[]} />
          <Application applicationData={data} />
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

