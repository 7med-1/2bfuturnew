'use client';

import { useGetPiecesQuery } from '@/state/api';
import Header from '@/app/(components)/Header';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'pieceId', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'name',
    width: 200,
    editable: true,
  },
  {
    field: 'reference',
    headerName: 'reference',
    width: 150,
    editable: true,
  },
  {
    field: 'place',
    headerName: 'place',
    width: 150,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'description',
    width: 160,
  },
  {
    field: 'quantity',
    headerName: 'quantity',
    width: 160,
    editable: true,
    type: 'number',
  },
];

function Inventory() {
  const { data: pieces, isError, isLoading } = useGetPiecesQuery();

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !pieces) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch pieces
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <DataGrid
        rows={pieces}
        columns={columns}
        getRowId={(row) => row.pieceId}
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
}

export default Inventory;
