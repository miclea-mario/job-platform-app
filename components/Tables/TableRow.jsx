import { TableCell, TableRow as TableRowUI } from '@components/ui/table';

const TableRow = ({ row, children }) => {
  return (
    <TableRowUI data-state={row?.getIsSelected?.() ? 'selected' : undefined}>
      {children ? (typeof children === 'function' ? children(row) : children) : null}
      {!children && row.getVisibleCells?.()
        ? row
            .getVisibleCells()
            .map((cell) => (
              <TableCell key={cell.id}>
                {cell.column.columnDef.cell ? cell.column.columnDef.cell(cell) : cell.getValue?.()}
              </TableCell>
            ))
        : null}
    </TableRowUI>
  );
};

export default TableRow;
