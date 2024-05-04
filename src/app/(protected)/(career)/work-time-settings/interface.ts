export interface IWorkTimeSettings {
  id: number
  branch: number
  checkInTime: string
  checkOutTime: string
  lateTime: string
  dayOfWeek: string
  workTimeSettings: Array<{
    id: number
    branch: number
    checkInTime: string
    checkOutTime: string
    lateTime: string
    dayOfWeek: string
  }>
}
