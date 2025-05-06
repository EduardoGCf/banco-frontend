// src/application/beneficiario/editarBeneficiario.ts
import axios from "../../adapters/api/axios";

export const editarBeneficiario = async (
  id: number,
  alias: string
): Promise<void> => {
  await axios.put(`/beneficiarios/${id}/editar/`, { alias });
};
