// assets
import { IconKey } from '@tabler/icons-react';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import FactoryIcon from '@mui/icons-material/Factory';

// constant
const icons = {
  IconKey,
  GroupIcon,
  CategoryIcon,
  InventoryIcon,
  FactoryIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'master',
  title: 'app.menus.master',
//   caption: 'Masters',
  icon: icons.IconKey,
  type: 'group',
  children: [
    {
      id: 'farmer',
      title: 'app.menus.farmer',
      type: 'item',
      icon: icons.GroupIcon,
      url: '/farmer/view'
    },
    {
      id: 'item',
      title: 'app.menus.item',
      type: 'item',
      icon: icons.InventoryIcon,
      url: '/item/view'
    },
    {
      id: 'category',
      title: 'app.menus.category',
      type: 'item',
      icon: icons.CategoryIcon,
      url: '/category/view'
    },
    {
      id: 'manufacturer',
      title: 'app.menus.manufacturer',
      type: 'item',
      icon: icons.FactoryIcon,
      url: '/manufacturer/view'
    }         
  ]
};

export default pages;
