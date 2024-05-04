"use client";
import { Application } from "../../containers/show/Application";
import { Show } from "@/shadcn/components/crud";
import type { IApplication } from "../../interface";
import {
  type ISkill,
  type IWorkExperience,
  Skill,
  useSkill,
  useWorkExperience,
  WorkExperience,
} from "../../../index";
import { usePhysical } from "../../hooks";
import { useProfile } from "@src/app/(protected)/(personal)/profile/hooks";
import { type IProfile } from "@src/app/(protected)/(personal)/profile/interface/model";
import { type IPhysical } from "@src/app/(protected)/(personal)/physical/interface";
import { ProfileDetail } from "@src/app/(protected)/(personal)/profile/containers/card/ProfileDetail";
import { Physical } from "@src/app/(protected)/(personal)/physical/containers/Physical";
import { AddressDetail, DocumentPDF, EducationDetail } from "@src/app/(protected)/(personal)/profile/containers/card";
import { useShowApplication } from "../../hooks/useTableApplication";

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
          <ProfileDetail profileData={profileData} visible={false} />
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

