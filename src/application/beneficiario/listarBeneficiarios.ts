// src/application/beneficiario/listarBeneficiarios.ts
import axios from "../../adapters/api/axios";

export const listarBeneficiarios = async () => {
  const res = await axios.get("beneficiarios/");
  return res.data;
};
