import { useEffect, useState } from 'react';
import { Cuenta } from '../../domain/Cuenta';
import { listarCuentas } from '../../application/cuenta/listarCuentas';
import { transferirSaldo } from '../../application/cuenta/transferirSaldo';
import { listarBeneficiarios } from '../../application/beneficiario/listarBeneficiarios';
import { Beneficiario } from '../../domain/Beneficiario';
interface Props {
  onTransferenciaExitosa: () => void;
}

export default function TransferenciaForm({ onTransferenciaExitosa }: Props) {
  const [cuentas, setCuentas] = useState<Cuenta[]>([]);
  const [cuentaOrigenId, setCuentaOrigenId] = useState<number | null>(null);
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);
  const [nroCuentaDestino, setNroCuentaDestino] = useState('');
  const [monto, setMonto] = useState('');

  useEffect(() => {
    listarCuentas().then(data => {
      setCuentas(data);
      if (data.length > 0) {
        setCuentaOrigenId(data[0].id);
      }
    });

    listarBeneficiarios().then(setBeneficiarios);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cuentaOrigenId || !nroCuentaDestino || !monto) return;

    try {
      await transferirSaldo(cuentaOrigenId, nroCuentaDestino, parseFloat(monto));
      setNroCuentaDestino('');
      setMonto('');
      onTransferenciaExitosa();
      alert('Transferencia realizada con éxito');
    } catch(err: any) {
      alert(err.response?.data?.error || 'Error al realizar la transferencia');
    }
  };

  return (
    <form className="p-4 border rounded bg-light" onSubmit={handleSubmit}>
      <h4 className="mb-3">Transferencia</h4>

      <div className="mb-3">
        <label className="form-label">Cuenta de origen</label>
        <select
          className="form-select"
          value={cuentaOrigenId ?? ''}
          onChange={e => setCuentaOrigenId(Number(e.target.value))}
          required
        >
          {cuentas.map(c => (
            <option key={c.id} value={c.id}>
              {c.nro_cuenta}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Beneficiario</label>
        <select
          className="form-select"
          value={nroCuentaDestino}
          onChange={e => setNroCuentaDestino(e.target.value)}
          required
        >
          <option value="">Selecciona un beneficiario</option>
          {beneficiarios.map(b => (
            <option key={b.id} value={b.nro_cuenta}>
              {b.alias} - {b.nro_cuenta}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Monto</label>
        <input
          type="number"
          className="form-control"
          placeholder="Ej: 100.00"
          value={monto}
          onChange={e => setMonto(e.target.value)}
          required
        />
      </div>

      <button className="btn btn-primary" type="submit">
        Transferir
      </button>
    </form>
  );
}
