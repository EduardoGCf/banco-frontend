import { useEffect, useState } from "react";
import { listarCuentas } from "../../application/cuenta/listarCuentas";
import { crearCuenta } from "../../application/cuenta/crearCuentas"; // Ensure this file exists or adjust the path

interface Cuenta {
  id: number;
  saldo: number;
}

export default function Cuentas() {
  const [cuentas, setCuentas] = useState<Cuenta[]>([]);

  const cargarCuentas = async () => {
    try {
      const data = await listarCuentas();
      setCuentas(data);
    } catch (error: any) {
      const mensaje = error.response?.data?.error || error.response?.data?.mensaje || "Error al cargar cuentas";
      alert(mensaje);
    }
  };

  const handleCrearCuenta = async () => {
    try {
      await crearCuenta();
      await cargarCuentas(); 
    } catch (error: any) {
      const mensaje = error.response?.data?.error || error.response?.data?.mensaje || "Error al crear cuentas";
      alert(mensaje);
    }
  };

  useEffect(() => {
    cargarCuentas();
  }, []);

  return (
    <div>
      <h2>Mis Cuentas</h2>
      <button onClick={handleCrearCuenta}>Crear nueva cuenta</button>
      <ul>
        {cuentas.map((cuenta) => (
          <li key={cuenta.id}>
            Cuenta #{cuenta.id} — Saldo: Bs {cuenta.saldo}
          </li>
        ))}
      </ul>
    </div>
  );
}
