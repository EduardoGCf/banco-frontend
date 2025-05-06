// src/application/cuenta/listarCuentas.ts
import axios from "../../adapters/api/axios";

export const listarCuentas = async () => {
  const res = await axios.get("cuentas/");
  return res.data;
};
