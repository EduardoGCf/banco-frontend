// src/application/beneficiario/eliminarBeneficiario.ts
import axios from "../../adapters/api/axios";

export const eliminarBeneficiario = async (id: number) => {
  await axios.delete(`beneficiarios/${id}/`);
};
