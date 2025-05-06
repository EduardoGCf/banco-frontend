// src/application/auth/login.ts

import axios from "../../adapters/api/axios";
import { saveTokens } from "../../infrastructure/authStorage";

export const login = async (
  username: string,
  password: string
): Promise<void> => {
  const res = await axios.post("token/", { username, password });
  saveTokens(res.data.access, res.data.refresh);
};
