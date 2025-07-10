import UserActionsCell from '@components/Admin/UserActionsCell';
import UserStatusCell from '@components/Admin/UserStatusCell';
import { TableColumnHeader } from '@components/Tables';

const usersColumns = [
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Role',
    accessorKey: 'role',
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <TableColumnHeader column={column} title="Email" />,
  },
  {
    header: 'Status',
    accessorKey: 'active',
    cell: ({ row }) => <UserStatusCell value={row.original.active} />,
    enableSorting: true,
    enableHiding: true,
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => (
      <UserActionsCell
        userId={row.original._id}
        isActive={row.original.active}
        currentUserRole={row.original.role}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

export default usersColumns;
