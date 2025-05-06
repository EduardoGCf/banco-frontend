import axios from "axios";

export const retirarSaldo = async (
  cuentaId: number,
  monto: number
): Promise<void> => {
  await axios.post(`cuentas/${cuentaId}/retirar/`, { monto });
};
