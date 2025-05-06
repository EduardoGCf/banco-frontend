import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registrar } from '../../application/auth/registrar';

export default function Registro() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    ci: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registrar(
        form.username,
        form.password,
        form.first_name,
        form.last_name,
        form.ci
      );
      navigate('/');
    } 
    catch (error: any) {
      const mensaje = error.response?.data?.error || error.response?.data?.mensaje || "Error al registrar usuario";
      alert(mensaje);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '500px' }}>
        <h3 className="text-center mb-4">Registro de Usuario</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input name="first_name" className="form-control" placeholder="Nombre" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input name="last_name" className="form-control" placeholder="Apellido" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">CI</label>
            <input name="ci" className="form-control" placeholder="CI" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input name="username" className="form-control" placeholder="Usuario" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input name="password" type="password" className="form-control" placeholder="Contraseña" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-success w-100">Registrarse</button>
        </form>
        <p className="text-center mt-3">
          ¿Ya tienes cuenta? <a href="/">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}
