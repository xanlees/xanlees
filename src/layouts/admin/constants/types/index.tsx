import { type LucideIcon } from "lucide-react";

export interface NavItem {
  name: string
  list: string
  show: string
  create: string
  edit: string
  title: string
  href?: string
  icon: LucideIcon
  color?: string
  isChidren?: boolean
  children?: NavItem[]
}
