import { WorkExperienceForm } from "./work-experience/containers/form/form";
import { type ApplicationState } from "./application/context/interface";
import {
  useApplicationContext,
  ApplicationProvider,
} from "./application/context";
import { applicationFromStep } from "./application/containers/form/setting";
import { type IApplication } from "./application/interface";
import {
  AddressDetail,
  DocumentPDF,
  ProfileDetail,
  useProfile,
} from "../(career)";
import { type IProfile } from "../(personal)/profile/interface/model";
import { EducationDetail } from "../(personal)/profile/containers/card";
import {
  useEducation,
  usePersonalAddress,
} from "@src/app/(protected)/(personal)/profile/hooks/show";
import {
  type IAddress,
  type IEducation,
} from "@src/app/(protected)/(personal)";
import { usePhysical } from "../(personal)/physical/hook";
import { useWorkExperience } from "./work-experience/hook";
import { type IWorkExperience } from "./work-experience/interface";
import { Skill } from "./skill/containers/Skill";
import { WorkExperience } from "./work-experience/containers/WorkExperience";
import { useSkill } from "./skill/hook";
import { type ISkill } from "./skill/interface";
import { Physical } from "../(personal)/physical/containers/Physical";
import { type IPhysical } from "../(personal)/physical/interface";
export type {
  ApplicationState,
  IApplication,
  IProfile,
  IAddress,
  IEducation,
  IWorkExperience,
  ISkill,
  IPhysical,
};
export {
  WorkExperienceForm,
  useApplicationContext,
  ApplicationProvider,
  applicationFromStep,
  DocumentPDF,
  ProfileDetail,
  useProfile,
  AddressDetail,
  EducationDetail,
  useEducation,
  usePersonalAddress,
  usePhysical,
  useWorkExperience,
  Skill,
  WorkExperience,
  useSkill,
  Physical,
};
