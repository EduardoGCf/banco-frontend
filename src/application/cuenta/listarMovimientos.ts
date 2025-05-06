// application/cuenta/listarMovimientos.ts
import axios from "../../adapters/api/axios";
import { Movimiento } from "../../domain/Movimiento";

export async function listarMovimientos(
  cuentaId: number
): Promise<Movimiento[]> {
  const response = await axios.get(`/cuentas/${cuentaId}/movimientos/`);
  return response.data;
}
