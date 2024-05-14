export interface IAddress {
  district: IDistrict
  id: number
  village: string
  status: string
  houseNo: string
  profile: number
}

export interface IDistrict {
  id: number
  districtName: string
  provinceName: string
}
