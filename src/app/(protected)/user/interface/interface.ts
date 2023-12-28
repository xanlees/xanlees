/* eslint-disable @typescript-eslint/naming-convention */
export interface IUser {
  id: number
  username: string
  isActive: boolean
  isStaff: boolean
  date_joined: string
}

export interface IGroup {
  id: number
  name: string
}
