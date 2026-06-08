export const ADMIN_EMAIL = "chj010917@gmail.com";

export function isAdmin(email: string | undefined | null): boolean {
  return email === ADMIN_EMAIL;
}
