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
  title: 'Masters',
//   caption: 'Masters',
  icon: icons.IconKey,
  type: 'group',
  children: [
    {
      id: 'farmer',
      title: 'Farmer',
      type: 'item',
      icon: icons.GroupIcon,
      url: '/farmer/view'
    },
    {
      id: 'item',
      title: 'Items',
      type: 'item',
      icon: icons.InventoryIcon,
      url: '/item/view'
    },
    {
      id: 'category',
      title: 'Category',
      type: 'item',
      icon: icons.CategoryIcon,
      url: '/category/view'
    },
    {
      id: 'manufacturer',
      title: 'Manufacturer',
      type: 'item',
      icon: icons.FactoryIcon,
      url: '/manufacturer/view'
    }         
  ]
};

export default pages;
