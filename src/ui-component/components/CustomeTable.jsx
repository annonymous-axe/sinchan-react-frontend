// src/components/CustomTable.js
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Box, Stack } from '@mui/material';

const CustomTable = ({ rows, columns }) => {
  const [searchText, setSearchText] = useState('');

  // Filter rows based on search
  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <Box sx={{ width: '100%' }}>
      {/* Search Bar Top-Right */}
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Stack>

      {/* DataGrid Table */}
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        sx={{
          border: 'none',
          boxShadow: 1,
          borderRadius: 2,
          backgroundColor: 'background.paper',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'primary.main',
            color: '#fff',
            fontWeight: 'bold'
          },
          '& .MuiTablePagination-root': {
            marginTop: '-10px' // Moves pagination a bit up
          }
        }}
      />
    </Box>
  );
};

export default CustomTable;
