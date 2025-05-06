import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../ui/pages/Login';
import Dashboard from '../ui/pages/Dashboard';
import Beneficiarios from '../ui/pages/Beneficiarios';
import PrivateRoute from '../ui/components/PrivateRoute';
import Registro from '../ui/pages/Registro';
import Movimientos from '../ui/pages/Movimientos';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/beneficiarios" element={<PrivateRoute><Beneficiarios /></PrivateRoute>} />
        <Route path="/" element={<Login />} />
        <Route path="/cuentas" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/movimientos/:cuentaId" element={<Movimientos />} />

      </Routes>
    </Router>
  );
}

export default App;
