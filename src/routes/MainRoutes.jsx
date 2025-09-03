import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { AuthContext, useAuth } from '../contexts/authContext';
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
const Quotation = Loadable(lazy(() => import('views/pages/quotation/index')));
const Category = Loadable(lazy(() => import('views/pages/category/index')));
const Purchase = Loadable(lazy(() => import('views/pages/purchase/index')));
const Setting = Loadable(lazy(() => import('views/pages/setting/index')));
const User = Loadable(lazy(() => import('views/pages/user/index')));

// ==============================|| MAIN ROUTING ||============================== //

// authentication provider

function AuthenticateRoute({ children }){

  const context = useAuth();

  if(context.isAuthenticated){
    return children;
  }

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
      path: '/invoice/view',
      element: <Invoice />
    },
    {
      path: '/purchase/view',
      element: <Purchase />
    },
    {
      path: '/quotation/view',
      element: <Quotation />
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
    },
    {
      path: '/setting/view',
      element: <Setting />
    },
    {
      path: '/user/view',
      element: <User />
    }
  ]
};

export default MainRoutes;
