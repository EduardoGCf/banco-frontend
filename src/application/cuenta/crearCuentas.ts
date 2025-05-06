import axios from "../../adapters/api/axios";

export const crearCuenta = async (): Promise<{ id: number; saldo: number }> => {
  const res = await axios.post("/cuentas/crear/");
  return res.data;
};

export const borrarCuenta = async (cuentaId: number): Promise<void> => {
  await axios.delete(`/cuentas/${cuentaId}/eliminar/`);
};
