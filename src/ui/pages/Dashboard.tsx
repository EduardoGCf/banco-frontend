import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cuenta } from '../../model/Cuenta';
import { Movimiento } from '../../model/Movimiento';
import { listarCuentas } from '../../application/cuenta/listarCuentas';
import { listarMovimientos } from '../../application/cuenta/listarMovimientos';
import { ingresarSaldo } from '../../application/cuenta/ingresarSaldo';
import { retirarSaldo } from '../../application/cuenta/retirarSaldo';
import TransferenciaForm from '../components/TransferenciaForm';
import Navbar from '../components/Navbar';
import { borrarCuenta, crearCuenta } from '../../application/cuenta/crearCuentas';
import { Usuario } from '../../model/Usuario';
import { getUsuarioActual } from '../../application/usuario/getUsuarioActual';
export default function Dashboard() {
  const [cuentas, setCuentas] = useState<Cuenta[]>([]);
  const [movimientosPorCuenta, setMovimientosPorCuenta] = useState<Record<number, Movimiento[]>>({});
  const [movimientosVisibles, setMovimientosVisibles] = useState<Record<number, boolean>>({});
  const [monto, setMonto] = useState<Record<number, string>>({});
  const [mostrarTransferencia, setMostrarTransferencia] = useState(false);
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const cargarCuentas = () => {
    listarCuentas()
      .then(setCuentas)
      .catch((err:any) => alert(err.response?.data?.error || 'Error al cargar cuentas'));
  };

  useEffect(() => {
    cargarCuentas();
    getUsuarioActual()
      .then(setUsuario)
      .catch((err:any) => console.warn(err.response?.data?.error || 'Error al obtener usuario actual'));
  }, []);

  const handleCrearCuenta = async () => {
    try {
      await crearCuenta();
      await cargarCuentas();
    } catch(err: any) {
      alert(err.response?.data?.error || 'Error al crear cuenta');
    }
  };

  const handleBorrarCuenta = async (cuentaId: number) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta cuenta?')) {
      try {
        await borrarCuenta(cuentaId);
        alert('Cuenta eliminada exitosamente');
        cargarCuentas();
      } catch(err: any) {
        alert(err.response?.data?.error || 'Error al eliminar cuenta');
      }
    }
  }

  const toggleMovimientos = async (cuentaId: number) => {
    const visible = movimientosVisibles[cuentaId];
    if (visible) {
      await recargarMovimientos(cuentaId); 
      setMovimientosVisibles(prev => ({ ...prev, [cuentaId]: false }));
    } else {
      if (!movimientosPorCuenta[cuentaId]) {
        const movimientos = await listarMovimientos(cuentaId);
        setMovimientosPorCuenta(prev => ({ ...prev, [cuentaId]: movimientos }));
      }
      setMovimientosVisibles(prev => ({ ...prev, [cuentaId]: true }));
    }
  };
  

  const actualizarMonto = (cuentaId: number, value: string) => {
    setMonto(prev => ({ ...prev, [cuentaId]: value }));
  };
  
  const recargarMovimientos = async (cuentaId: number) => {
    try {
      const movimientos = await listarMovimientos(cuentaId);
      setMovimientosPorCuenta(prev => ({ ...prev, [cuentaId]: movimientos }));
    } catch(err: any) {
      alert(err.response?.data?.error || 'Error al cargar movimientos');
    }
  }

  const handleIngreso = async (cuentaId: number) => {
    const valor = parseFloat(monto[cuentaId]);
    if (isNaN(valor) || valor <= 0) {
      alert("Debe ingresar un monto válido");
      return;
    }

    try {
      await ingresarSaldo(cuentaId, valor);
      alert('Ingreso exitoso');
      cargarCuentas();
      recargarMovimientos(cuentaId); 
    } catch(err: any) {
      alert(err.response?.data?.error || 'Error al ingresar saldo');
    }
  };

  const handleRetiro = async (cuentaId: number) => {
    const valor = parseFloat(monto[cuentaId]);
    if (isNaN(valor) || valor <= 0) {
      alert("Debe ingresar un monto válido");
      return;
    }

    try {
      await retirarSaldo(cuentaId, valor);
      alert('Retiro exitoso');
      cargarCuentas();
    } catch(err: any) {
      alert(err.response?.data?.error || 'Error al retirar saldo');
    }
  };

  return (
    <div>
      <Navbar />
      {usuario && (
  <div className="alert alert-info d-flex justify-content-between align-items-center shadow-sm">
    <div>
      <h5 className="mb-1">👤 Usuario actual</h5>
      <p className="mb-0"><strong>Nombre:</strong> {usuario.first_name} {usuario.last_name}</p>
      <p className="mb-0"><strong>Usuario:</strong> {usuario.username}</p>
      <p className="mb-0"><strong>CI:</strong> {usuario.id}</p>
    </div>
  </div>
)}

      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Tus Cuentas {usuario && `- ${usuario.first_name} ${usuario.last_name}`}</h2>

          <div>
            <button className="btn btn-success me-2" onClick={handleCrearCuenta}>Crear nueva cuenta</button>
            <button className="btn btn-primary" onClick={() => setMostrarTransferencia(prev => !prev)}>
              {mostrarTransferencia ? 'Cerrar transferencia' : 'Transferir'}
            </button>
          </div>
        </div>

        {mostrarTransferencia && (
          <div className="card mt-4 shadow-sm">
            <div className="card-body">
              <TransferenciaForm
                onTransferenciaExitosa={() => {
                  cargarCuentas();
                  setMostrarTransferencia(false);
                }}
              />
            </div>
          </div>
        )}

        <div className="row">
          {cuentas.map(cuenta => (
            <div className="col-md-6 col-lg-4 mb-4" key={cuenta.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Cuenta: {cuenta.nro_cuenta} - {cuenta.id}</h5>
                  <p className="card-text"><strong>Saldo:</strong> Bs. {cuenta.saldo}</p>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Monto"
                    value={monto[cuenta.id] ?? ''}
                    onChange={e => actualizarMonto(cuenta.id, e.target.value)}
                  />
                  <div className="d-grid gap-2">
                    <button className="btn btn-outline-success" onClick={() => handleIngreso(cuenta.id)}>Ingresar</button>
                    <button className="btn btn-outline-warning" onClick={() => handleRetiro(cuenta.id)}>Retirar</button>
                    <button className="btn btn-outline-info" onClick={() => toggleMovimientos(cuenta.id)}>
                      {movimientosVisibles[cuenta.id] ? 'Cerrar movimientos' : 'Ver movimientos'}
                    </button>
                    <button className="btn btn-outline-danger" onClick={() => handleBorrarCuenta(cuenta.id)}>Eliminar cuenta</button>
                  </div>

                  {movimientosVisibles[cuenta.id] && movimientosPorCuenta[cuenta.id] && (
                    <ul className="list-group list-group-flush mt-3">
                      {movimientosPorCuenta[cuenta.id].map((m, index) => (
                        <li className="list-group-item" key={`mov-${cuenta.id}-${m.id ?? index}`}>
                          <small>[{m.tipo}] {m.descripcion} — Bs. {m.monto}</small><br />
                          <small className="text-muted">{new Date(m.fecha).toLocaleString()}</small>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
