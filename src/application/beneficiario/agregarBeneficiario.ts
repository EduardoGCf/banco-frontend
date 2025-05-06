// src/application/beneficiario/agregarBeneficiario.ts
import axios from "../../adapters/api/axios";

export const agregarBeneficiario = async (
  nombre: string,
  nro_cuenta: string
) => {
  await axios.post("beneficiarios/", { alias: nombre, nro_cuenta });
};
