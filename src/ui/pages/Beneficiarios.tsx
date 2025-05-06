import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Beneficiario } from '../../domain/Beneficiario';
import { listarBeneficiarios } from '../../application/beneficiario/listarBeneficiarios';
import { agregarBeneficiario } from '../../application/beneficiario/agregarBeneficiario';
import { eliminarBeneficiario } from '../../application/beneficiario/eliminarBeneficiario';
import Navbar from '../components/Navbar';

export default function Beneficiarios() {
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);
  const [alias, setAlias] = useState('');
  const [nroCuenta, setNroCuenta] = useState('');
  const navigate = useNavigate();

  const cargarBeneficiarios = () => {
    listarBeneficiarios()
      .then(setBeneficiarios)
      .catch(() => alert('Error al cargar beneficiarios'));
  };

  useEffect(() => {
    cargarBeneficiarios();
  }, []);

  const handleAgregar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await agregarBeneficiario(alias, nroCuenta);
      setAlias('');
      setNroCuenta('');
      cargarBeneficiarios();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Error al agreeeegar beneficiario');
    }
  };
  

  const handleEliminar = async (id: number) => {
    try {
      await eliminarBeneficiario(id);
      cargarBeneficiarios();
    } catch(err: any) {
      alert(err.response?.data?.error || 'Error al eliminar beneficiario');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2 className="mb-4">Gestión de Beneficiarios</h2>

        <form className="card p-4 mb-4 shadow-sm" onSubmit={handleAgregar}>
          <div className="mb-3">
            <label className="form-label">Alias</label>
            <input
              type="text"
              className="form-control"
              placeholder="Alias"
              value={alias}
              onChange={e => setAlias(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Número de cuenta</label>
            <input
              type="text"
              className="form-control"
              placeholder="Número de cuenta"
              value={nroCuenta}
              onChange={e => setNroCuenta(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary" type="submit">Agregar Beneficiario</button>
        </form>

        <h4>Lista de Beneficiarios</h4>
        <ul className="list-group">
          {beneficiarios.map(b => (
            <li key={b.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{b.alias}</strong> — {b.nro_cuenta}
              </div>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleEliminar(b.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
