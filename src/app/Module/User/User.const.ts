export const USER_ROLE = {
  user: "user",
  admin: "admin",
  supervisor: "supervisor",
} as const;

export const USER_STATUS = {
  active: "active",
  block: "block",
} as const;

export const userSearchTerm = ["name", "email", "role", "status"];
