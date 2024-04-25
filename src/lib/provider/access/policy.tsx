import { StringAdapter } from "casbin";

export const adapter = new StringAdapter(`
p, admin, user, (list)|(create)
p, admin, user/*, (edit)|(show)|(delete)
p, anonymous, user, (list)
p, anonymous, user/*, (show)
p, admin, profile, (list)|(create)
p, admin, profile/*, (edit)|(show)|(delete)
p, anonymous, profile, (list)|(create)
p, anonymous, profile/*, (show)
p, admin, employee, (list)|(create)
p, admin, employee/*, (edit)|(show)|(delete)
p, anonymous, employee, (list)
p, anonymous, employee/*, (show)
p, admin, application/*, (edit)|(show)|(delete)
p, admin, application, (list)|(create)
p, anonymous, application, (create)
p, admin, branch/*, (edit)|(show)|(delete)
p, admin, branch, (list)|(create)
p, admin, district/*, (edit)|(show)|(delete)
p, admin, district, (list)|(create)
p, anonymous, district, (list)
p, anonymous, district/*, (show)
p, admin, document/*, (edit)|(show)|(delete)
p, admin, document, (list)|(create)
p, anonymous, document, (create)
p, admin, education/*, (edit)|(show)|(delete)
p, admin, education, (list)|(create)
p, anonymous, education, (list)|(create)
p, anonymous, education/*, (edit)|(show)
p, admin, graduation/*, (edit)|(show)|(delete)
p, admin, graduation, (list)|(create)
p, anonymous, graduation, (list)|(create)
p, anonymous, graduation/*, (edit)|(show)|(delete)
p, admin, personal_address/*, (edit)|(show)|(delete)
p, admin, personal_address, (list)|(create)
p, anonymous, personal_address, (create)
p, admin, physical_profile/*, (edit)|(show)|(delete)
p, admin, physical_profile, (list)|(create)
p, anonymous, physical_profile, (create)
p, admin, position/*, (edit)|(show)|(delete)
p, admin, position, (list)|(create)
p, admin, sector/*, (edit)|(show)|(delete)
p, admin, sector, (list)|(create)
p, admin, work_experience/*, (edit)|(show)|(delete)
p, admin, work_experience, (list)|(create)
p, anonymous, work_experience, (create)
p, admin, agent/*, (edit)|(show)|(delete)
p, admin, agent, (list)|(create)
p, admin, lottery-branch/*, (edit)|(show)|(delete)
p, admin, lottery-branch, (list)|(create)
p, admin, skill/*, (edit)|(show)|(delete)
p, admin, skill, (list)|(create)
p, anonymous, skill, (create)
p, admin, attendance/*, (edit)|(show)|(delete)
p, admin, attendance, (list)|(create)
p, admin, user-profile/*, (edit)|(show)|(delete)
p, admin, user-profile, (list)|(create)
p, admin, user, (list)|(create)
p, admin, user/*, (edit)|(show)|(delete)
p, admin, work-time-settings/*, (edit)|(show)|(delete)
p, admin, work-time-settings, (list)|(create)
`);

