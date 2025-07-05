'use client';

import { Link } from '@components';
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
    accessorKey: 'job.title',
    header: ({ column }) => <TableColumnHeader column={column} title="Job" />,
    cell: ({ row }) => {
      const company = row.original?.company;
      return (
        <Link href={`/jobs/${row.original.job._id}`} className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={company?.avatar} />
            <AvatarFallback>{company?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-medium">{row.original.job.title}</p>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <TableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={
            status === 'Accepted' ? 'success' : status === 'Rejected' ? 'destructive' : 'secondary'
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'jobMatchReport.score',
    header: ({ column }) => <TableColumnHeader column={column} title="AI Match" />,
    cell: ({ row }) => {
      const score = row.original.jobMatchReport.score || 0;
      return <CircularProgress value={score} />;
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <TableColumnHeader column={column} title="Applied On" />,
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return <p>{formatDate(date)}</p>;
    },
  },
  {
    accessorKey: 'interview.date',
    header: ({ column }) => <TableColumnHeader column={column} title="Interview Date" />,
    cell: ({ row }) => {
      const date = row.original.interview?.date;
      const time = row.original.interview?.time;

      return <p>{date ? `${formatDate(date)} - ${time}` : '-'}</p>;
    },
  },
];

export default applicationColumns;
