// src/adapters/api/cuentaApi.ts

import axios from "./axios";

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
