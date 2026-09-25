import type { Access } from "payload";

type Role = "admin" | "editor" | "sales";

function hasRole(user: unknown, roles: Role[]) {
  if (!user || typeof user !== "object" || !("role" in user)) return false;
  return roles.includes((user as { role?: Role }).role as Role);
}

export const isAdmin: Access = ({ req }) => hasRole(req.user, ["admin"]);

export const isAdminOrEditor: Access = ({ req }) =>
  hasRole(req.user, ["admin", "editor"]);

export const isAdminOrSales: Access = ({ req }) =>
  hasRole(req.user, ["admin", "sales"]);

export const publishedOnly: Access = ({ req }) =>
  req.user ? true : { published: { equals: true } };

export const consentedTeamOnly: Access = ({ req }) =>
  req.user ? true : { publicConsent: { equals: true } };

export const permittedClientsOnly: Access = ({ req }) =>
  req.user ? true : { permissionConfirmed: { equals: true } };

export const verifiedCertificationsOnly: Access = ({ req }) =>
  req.user ? true : { verified: { equals: true } };
