import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { listarMovimientos } from '../../application/cuenta/listarMovimientos';
import { Movimiento } from '../../domain/Movimiento';
import Navbar from '../components/Navbar';

export default function Movimientos() {
  const { cuentaId } = useParams<{ cuentaId: string }>();
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cuentaId) {
      listarMovimientos(Number(cuentaId))
        .then(data => setMovimientos(data))
        .catch((error: any) => {const mensaje = error.response?.data?.error || error.response?.data?.mensaje || "Error al cargar cuentas";
          alert(mensaje)})
        .finally(() => setLoading(false));
    }
    
  }, [cuentaId]);

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2>Movimientos de la Cuenta #{cuentaId}</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <ul className="list-group mt-3">
            {movimientos.length === 0 ? (
              <li className="list-group-item">No hay movimientos</li>
            ) : (
              movimientos.map((m, index) => (
                <li key={`${m.id}-${index}`} className="list-group-item">
                  <strong>[{m.tipo}]</strong> {m.descripcion || ''} — Bs. {m.monto}
                  <br />
                  <small className="text-muted">{new Date(m.fecha).toLocaleString()}</small>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
