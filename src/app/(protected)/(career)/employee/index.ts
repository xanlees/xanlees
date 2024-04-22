export interface IEmployee {
  joiningDate: string
  isLatest: boolean
  positionId: {
    name: string
    id: number
    sectorId: { name: string, id: number, branchId: number }
  }
  profileId: {
    id: number
    fullname: string
    nickname: string
    phoneNumber: string
    gender: string
    birthday: string
    maritalStatus: string
    profilePicture: string
    uniqueNumber: string[]
    typeOfUniqueNumber: string
  }
  id: number
  branchId: number
}
