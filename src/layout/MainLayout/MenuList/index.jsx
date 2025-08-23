import { memo, useState } from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import NavItem from './NavItem';
import NavGroup from './NavGroup';
import menuItems from 'menu-items';

import { useGetMenuMaster } from 'api/menu';
import { useTranslation } from 'react-i18next';

// ==============================|| SIDEBAR MENU LIST ||============================== //

function MenuList() {

  const{ t } = useTranslation();

  function translateTitles(items){
    return items.map((item) => ({
      ...item,
      title: t(item.title),
      caption: t(item.caption),
      ...(item.children && {children: translateTitles(item.children)})
    }));
  }

  const items = translateTitles(menuItems.items);

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const [selectedID, setSelectedID] = useState('');

  const lastItem = null;

  let lastItemIndex = items.length - 1;
  let remItems = [];
  let lastItemId;

  if (lastItem && lastItem < items.length) {
    lastItemId = items[lastItem - 1].id;
    lastItemIndex = lastItem - 1;
    remItems = items.slice(lastItem - 1, items.length).map((item) => ({
      title: item.title,
      elements: item.children,
      icon: item.icon,
      ...(item.url && {
        url: item.url
      })
    }));
  }

  const navItems = items.slice(0, lastItemIndex + 1).map((item, index) => {
    switch (item.type) {
      case 'group':
        if (item.url && item.id !== lastItemId) {
          return (
            <List key={item.id}>
              <NavItem item={item} level={1} isParents setSelectedID={() => setSelectedID('')} />
              {index !== 0 && <Divider sx={{ py: 0.5 }} />}
            </List>
          );
        }

        return (
          <NavGroup
            key={item.id}
            setSelectedID={setSelectedID}
            selectedID={selectedID}
            item={item}
            lastItem={lastItem}
            remItems={remItems}
            lastItemId={lastItemId}
          />
        );
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <Box {...(drawerOpen && { sx: { mt: 1.5 } })}>{navItems}</Box>;
}

export default memo(MenuList);
