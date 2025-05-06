import axios from "axios";

export const ingresarSaldo = async (
  cuentaId: number,
  monto: number
): Promise<void> => {
  await axios.post(`cuentas/${cuentaId}/ingresar/`, { monto });
};
