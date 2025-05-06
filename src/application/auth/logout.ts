// src/application/auth/logout.ts

import { clearTokens } from "../../infrastructure/authStorage";

export const logout = (): void => {
  clearTokens();
};
