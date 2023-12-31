import { StringAdapter } from "casbin";

export const adapter = new StringAdapter(`
p, admin, user, (list)|(create)
p, admin, user/*, (edit)|(show)|(delete)
p, admin, employee, (list)|(create)
p, admin, employee/*, (edit)|(show)|(delete)
p, admin, branch, (list)|(create)
p, admin, branch/*, (edit)|(show)|(delete)
`);
