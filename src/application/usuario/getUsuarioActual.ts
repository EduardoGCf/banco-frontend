// src/application/usuario/getUsuarioActual.ts
import axios from "../../adapters/api/axios";
import { Usuario } from "../../domain/Usuario";

export async function getUsuarioActual(): Promise<Usuario> {
  const response = await axios.get("/usuarios/me/");
  return response.data;
}
