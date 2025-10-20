import { createAccessControl } from 'better-auth/plugins/access';
import { adminAc, defaultStatements } from 'better-auth/plugins/admin/access';

const statement = {
  ...defaultStatements,
  blogs: ['crud', 'ai'],
} as const;

const ac = createAccessControl(statement);

const admin = ac.newRole({
  blogs: ['crud', 'ai'],
  ...adminAc.statements,
});

const user = ac.newRole({
  blogs: ['crud'],
});

export { ac, admin, user };
