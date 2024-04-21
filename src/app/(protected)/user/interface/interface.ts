import { type Dispatch, type SetStateAction } from "react";

export interface IUser {
  id: number
  username: string
  isActive: boolean
  isStaff: boolean
  dateJoined: string
}

export interface IGroup {
  id: number
  name: string
}

export interface UserProfile {
  user: number
  profile: number
}

export interface CreateUserProfileProps {
  user: number
  profile: number
  shouldCreateProfile: boolean
  setShouldCreateProfile: Dispatch<SetStateAction<boolean>>
}
