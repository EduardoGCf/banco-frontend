// src/adapters/api/movimientoApi.ts

import axios from "./axios";
import { Movimiento } from "../../domain/Movimiento";

export const obtenerMovimientos = async (
  cuentaId: number
): Promise<Movimiento[]> => {
  const res = await axios.get<Movimiento[]>(
    `movimientos/?cuenta_id=${cuentaId}`
  );
  return res.data;
};
