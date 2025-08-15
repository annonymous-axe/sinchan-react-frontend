// assets
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// constant
const icons = {
  ShoppingCartIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'purchase',
  title: 'purchase',
  caption: 'Purchase',
  icon: icons.ShoppingCartIcon,
  type: 'group',
  children: [
    {
      id: 'purchase',
      title: 'Purchase',
      type: 'item',
      icon: icons.ShoppingCartIcon,
      url: '/purchase/view'
    }  
  ]
};

export default pages;
