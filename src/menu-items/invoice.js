// assets
import { IconKey } from '@tabler/icons-react';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DescriptionIcon from '@mui/icons-material/Description';

// constant
const icons = {
  IconKey,
  ReceiptIcon,
  DescriptionIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'invoice',
  title: 'Invoice',
  caption: 'Invoice/Quotation',
  icon: icons.IconKey,
  type: 'group',
  children: [
    {
      id: 'invoice',
      title: 'Invoice',
      type: 'item',
      icon: icons.ReceiptIcon,
      url: '/invoice/view'
    },
    // {
    //   id: 'quotation',
    //   title: 'Quotation',
    //   type: 'item',
    //   icon: icons.DescriptionIcon,
    //   url: '/invoice/view'
    // }    
  ]
};

export default pages;
