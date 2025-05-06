import { Navigate } from 'react-router-dom';
import { getAccessToken } from '../../infrastructure/authStorage';
import { JSX } from 'react';

interface Props {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: Props) {
  const token = getAccessToken();
  return token ? children : <Navigate to="/" replace />;
}
