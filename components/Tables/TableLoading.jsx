import { Table, TableBody, TableCell } from '@components/ui/table';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { TableHeader, TableRow } from '.';

const TableLoading = ({ columns, rows = [] }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  // Create placeholder data for loading state
  const placeholderData = Array(rows || 5)
    .fill({})
    .map((_, index) => ({
      id: `loading-${index}`,
    }));

  const table = useReactTable({
    data: placeholderData,
    columns,
    manualPagination: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      // pagination: { pageIndex: page - 1, perPage },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader table={table} />
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow row={row} key={row.id}>
                {() => (
                  <>
                    {columns.map((col, idx) => (
                      <TableCell key={idx} className="h-12">
                        <div className="h-4 w-3/4 animate-pulse rounded-md bg-gray-200"></div>
                      </TableCell>
                    ))}
                  </>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableLoading;
