// src/application/cuenta/transferirSaldo.ts

import axios from "../../adapters/api/axios";

export const transferirSaldo = async (
  origen_id: number,
  destino_nro: string,
  monto: number
): Promise<void> => {
  await axios.post("transferir/", {
    origen_id,
    destino_nro,
    monto,
  });
};
