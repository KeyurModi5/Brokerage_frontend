import { Role } from './Constant';

export const timesheetPermissions = {
  [Role.Admin]: ['view', 'edit', 'delete'],
  [Role.Employee]: ['view', 'edit', 'delete'],
};

export const commonPermissions = {
  [Role.Admin]: ['view', 'edit', 'delete'],
  [Role.Employee]: [],
};

export const taskPermissions = {
  [Role.Admin]: ['view', 'edit', 'delete'],
  [Role.Employee]: ['view'],
};
