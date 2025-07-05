import { TableHead, TableHeader as TableHeaderUI, TableRow } from '@components/ui/table';
import { flexRender } from '@tanstack/react-table';

const TableHeader = ({ table }) => {
  return (
    <TableHeaderUI>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeaderUI>
  );
};

export default TableHeader;
