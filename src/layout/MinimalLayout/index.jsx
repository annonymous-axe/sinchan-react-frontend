import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

// ==============================|| MINIMAL LAYOUT ||============================== //


export default function MinimalLayout() {
  return (
    <Outlet />
  );
}
