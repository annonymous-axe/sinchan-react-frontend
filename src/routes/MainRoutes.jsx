import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { useAuth } from '../contexts/authContext';
import { Navigate } from 'react-router';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const Farmer = Loadable(lazy(() => import('views/pages/farmer/index')));
const Item = Loadable(lazy(() => import('views/pages/item/index')));
const Manufacturer = Loadable(lazy(() => import('views/pages/manufacturer/index')));
const Invoice = Loadable(lazy(() => import('views/pages/invoice/index')));
const Category = Loadable(lazy(() => import('views/pages/category/index')));

// ==============================|| MAIN ROUTING ||============================== //
// auth provider
function AuthenticateRoute({ children }){

  console.log("check for authentication.");

  const context = useAuth();

  if(context.isAuthenticated){
    console.log("authenticated");
    
    return children;
  }

  console.log("authentication fails.");
  
  return <Navigate to='/pages/login' />
}

const MainRoutes = {
  path: '/',
  element: (
      <AuthenticateRoute>
        <MainLayout />
      </AuthenticateRoute>
  ),
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'typography',
      element: <UtilsTypography />
    },
    {
      path: 'color',
      element: <UtilsColor />
    },
    {
      path: 'shadow',
      element: <UtilsShadow />
    },
    {
      path: '/invoice/view',
      element: <Invoice />
    },
    {
      path: '/farmer/view',
      element: <Farmer />
    },
    {
      path: '/item/view',
      element: <Item />
    },
    {
      path: '/manufacturer/view',
      element: <Manufacturer />
    },
    {
      path: '/category/view',
      element: <Category />
    }      
  ]
};

export default MainRoutes;
