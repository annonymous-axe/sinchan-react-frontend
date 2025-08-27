import { RouterProvider } from 'react-router-dom';

// routing
import router from 'routes';

// project imports


import ThemeCustomization from 'themes';
import AuthProvider from './contexts/authContext';

// ==============================|| APP ||============================== //

export default function App() {
  return (
    <AuthProvider>
      <ThemeCustomization>
        
          <RouterProvider router={router} />

      </ThemeCustomization>
    </AuthProvider>
  );
}
