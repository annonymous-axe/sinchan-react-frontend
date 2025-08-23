// assets
import { IconKey } from '@tabler/icons-react';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DescriptionIcon from '@mui/icons-material/Description';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// constant
const icons = {
  IconKey,
  ReceiptIcon,
  DescriptionIcon,
  ShoppingCartIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'invoice',
  title: 'app.menus.transaction',
  caption: 'app.menus.salesPurchase',
  icon: icons.IconKey,
  type: 'group',
  children: [
    {
      id: 'invoice',
      title: 'app.menus.invoice',
      type: 'item',
      icon: icons.ReceiptIcon,
      url: '/invoice/view'
    },
    {
      id: 'quotation',
      title: 'app.menus.quotation',
      type: 'item',
      icon: icons.DescriptionIcon,
      url: '/quotation/view'
    },
    {
      id: 'purchase',
      title: 'app.menus.purchase',
      type: 'item',
      icon: icons.ShoppingCartIcon,
      url: '/purchase/view'
    }     
  ]
};

export default pages;
