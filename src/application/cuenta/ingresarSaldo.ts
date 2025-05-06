import { ingresarSaldoApi } from "../../adapters/api/cuentaApi";

export const ingresarSaldo = async (
  cuentaId: number,
  monto: number
): Promise<void> => {
  await ingresarSaldoApi(cuentaId, monto);
};
