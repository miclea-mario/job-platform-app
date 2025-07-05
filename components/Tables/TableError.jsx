import { Table, TableBody, TableCell } from '@components/ui/table';
import { toaster } from '@lib';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { TableHeader, TableRow } from '.';

const TableError = ({ columns, rows = 5 }) => {
  useEffect(() => {
    toaster.error('Error! Could not load data');
  }, []);

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  // Create placeholder data for error state
  const placeholderData = Array(typeof rows === 'number' ? rows : 5)
    .fill({})
    .map((_, index) => ({
      id: `error-${index}`,
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
                        <div className="h-4 w-3/4 rounded-md bg-red-100 text-red-500"></div>
                      </TableCell>
                    ))}
                  </>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-red-500"
              ></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableError;
