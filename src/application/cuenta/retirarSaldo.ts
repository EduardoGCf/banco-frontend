import { retirarSaldoApi } from "../../adapters/api/cuentaApi";

export const retirarSaldo = async (
  cuentaId: number,
  monto: number
): Promise<void> => {
  await retirarSaldoApi(cuentaId, monto);
};
