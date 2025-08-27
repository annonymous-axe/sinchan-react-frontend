// assets
import SettingsIcon from '@mui/icons-material/Settings';

// constant
const icons = {
  SettingsIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'others',
  title: 'app.menus.others',
  type: 'group',
  children: [
    {
      id: 'setting',
      title: 'app.menus.setting',
      type: 'item',
      icon: icons.SettingsIcon,
      url: '/setting/view'
    }  
  ]
};

export default pages;
