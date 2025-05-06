// src/adapters/api/cuentaApi.ts

import axios from "./axios";
import { Cuenta } from "../../domain/Cuenta";

export const obtenerCuentas = async (): Promise<Cuenta[]> => {
  const res = await axios.get<Cuenta[]>("cuentas/");
  return res.data;
};
export const ingresarSaldoApi = async (
  cuentaId: number,
  monto: number
): Promise<void> => {
  await axios.post(`cuentas/${cuentaId}/ingresar/`, { monto });
};

export const retirarSaldoApi = async (
  cuentaId: number,
  monto: number
): Promise<void> => {
  await axios.post(`cuentas/${cuentaId}/retirar/`, { monto });
};
