import { registrarUsuario } from "../../adapters/api/authApi";

export const registrar = async (
  username: string,
  password: string,
  first_name: string,
  last_name: string,
  ci: string
): Promise<void> => {
  await registrarUsuario({ username, password, first_name, last_name, ci });
};
