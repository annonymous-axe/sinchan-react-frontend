// src/pages/UsersTablePage.js
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';

import CustomTable from '../../ui-component/components/CustomeTable';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'email', headerName: 'Email', flex: 1 },
  { field: 'role', headerName: 'Role', width: 150 }
];

const rows = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Alex Johnson', email: 'alex@example.com', role: 'Manager' },
  { id: 4, name: 'Mary Brown', email: 'mary@example.com', role: 'User' }
];

const UsersTablePage = () => {
  return (
    <MainCard title="User Management">
      <CustomTable rows={rows} columns={columns} />
    </MainCard>
  );
};

export default UsersTablePage;
