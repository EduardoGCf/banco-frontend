import axios from "./axios";

export const registrarUsuario = async (datos: {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  ci: string;
}): Promise<void> => {
  await axios.post("/registro/", datos);
};
