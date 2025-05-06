import axios from "./axios";
import { Beneficiario } from "../../domain/Beneficiario";

export const listarBeneficiariosApi = async (): Promise<Beneficiario[]> => {
  const res = await axios.get<Beneficiario[]>("beneficiarios/");
  return res.data;
};

export const agregarBeneficiarioApi = async (
  nombre: string,
  nro_cuenta: string
): Promise<void> => {
  await axios.post("beneficiarios/", { nombre, nro_cuenta });
};

export const eliminarBeneficiarioApi = async (id: number): Promise<void> => {
  await axios.delete(`beneficiarios/${id}/`);
};
