import { WorkExperienceForm } from "./work-experience/containers/form/form";
import { type ApplicationState } from "./application/context/interface";
import {
  useApplicationContext,
  ApplicationProvider,
  applicationStorageKey,
} from "./application/context";
import { applicationFromStep } from "./application/containers/form/setting";
import { type IApplication } from "./application/interface";
import { useWorkExperience } from "./work-experience/hook";
import { type IWorkExperience } from "./work-experience/interface";
import { Skill } from "./skill/containers/Skill";
import { WorkExperience } from "./work-experience/containers/WorkExperience";
import { useSkill } from "./skill/hook";
import { type ISkill } from "./skill/interface";
import { type IHoliday } from "./holiday/interface";
import { useHolidayList } from "./holiday/hooks";

export type {
  ApplicationState,
  IApplication,
  IWorkExperience,
  ISkill,
  IHoliday,
};

export {
  WorkExperienceForm,
  ApplicationProvider,
  applicationStorageKey,
  applicationFromStep,
  Skill,
  WorkExperience,
};

export {
  useApplicationContext,
  useWorkExperience,
  useSkill,
  useHolidayList,
};
