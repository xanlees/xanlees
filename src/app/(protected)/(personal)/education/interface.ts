export interface IEducation {
  year: string
  branch: string
  graduationId: {
    id: number
    degree: string
    sector: string
  }
  profileId: number
  id: number
}
