'use client';

import { CircularProgress } from '@components/TableCells';
import { TableColumnHeader } from '@components/Tables';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';
import { Checkbox } from '@components/ui/checkbox';
import { formatDate } from '@functions';

const applicationColumns = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'user.name',
    header: ({ column }) => <TableColumnHeader column={column} title="Applicant" />,
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-medium">{user.name}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'user.title',
    header: ({ column }) => <TableColumnHeader column={column} title="Title" />,
  },
  {
    accessorKey: 'user.location',
    header: ({ column }) => <TableColumnHeader column={column} title="Location" />,
  },
  {
    accessorKey: 'job.title',
    header: ({ column }) => <TableColumnHeader column={column} title="Applied For" />,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <TableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={
            status === 'accepted' ? 'success' : status === 'rejected' ? 'destructive' : 'secondary'
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'jobMatchReport.score',
    header: ({ column }) => <TableColumnHeader column={column} title="AI Match Score" />,
    cell: ({ row }) => {
      const score = row.original.jobMatchReport?.score || 0;
      return <CircularProgress value={score} />;
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <TableColumnHeader column={column} title="Applied Date" />,
    cell: ({ row }) => {
      return formatDate(new Date(row.original.createdAt), 'PPP');
    },
  },
];

export default applicationColumns;
