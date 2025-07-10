import { toggleJobStatus } from '@api/admin';
import { TableColumnHeader } from '@components/Tables';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { formatDate } from '@functions';
import { useMutation } from '@hooks';
import { ExternalLink, MoreHorizontal } from 'lucide-react';

const adminJobColumns = [
  {
    header: ({ column }) => <TableColumnHeader column={column} title="Title" />,
    accessorKey: 'title',
    cell: ({ row }) => (
      <div className="max-w-48">
        <p className="font-medium truncate">{row.getValue('title')}</p>
        <p className="text-xs text-muted-foreground truncate">{row.original.company?.email}</p>
      </div>
    ),
  },
  {
    header: ({ column }) => <TableColumnHeader column={column} title="Company" />,
    accessorKey: 'company',
    cell: ({ row }) => (
      <div className="max-w-32">
        <p className="font-medium truncate">{row.original.company?.name || 'N/A'}</p>
      </div>
    ),
  },
  {
    header: ({ column }) => <TableColumnHeader column={column} title="Location" />,
    accessorKey: 'city',
  },
  {
    header: ({ column }) => <TableColumnHeader column={column} title="Type" />,
    accessorKey: 'employmentType',
    cell: ({ row }) => (
      <div>
        <p className="text-sm">{row.getValue('employmentType')}</p>
        <p className="text-xs text-muted-foreground">{row.original.workplaceType}</p>
      </div>
    ),
  },
  {
    header: ({ column }) => <TableColumnHeader column={column} title="Salary" />,
    accessorKey: 'salary',
    cell: ({ row }) => {
      const salary = row.original.salary;
      if (salary && (salary.min || salary.max)) {
        return (
          <div className="text-sm">
            €{salary.min || 0} - €{salary.max || 0}
          </div>
        );
      }
      return <span className="text-muted-foreground">Not specified</span>;
    },
  },
  {
    header: ({ column }) => <TableColumnHeader column={column} title="Status" />,
    accessorKey: 'isActive',
    cell: ({ row }) => (
      <Badge variant={row.getValue('isActive') ? 'accepted' : 'secondary'}>
        {row.getValue('isActive') ? 'Active' : 'Inactive'}
      </Badge>
    ),
  },
  {
    header: ({ column }) => <TableColumnHeader column={column} title="Posted" />,
    accessorKey: 'createdAt',
    cell: ({ row }) => formatDate(row.getValue('createdAt')),
  },
  {
    header: ({ column }) => <TableColumnHeader column={column} title="Deadline" />,
    accessorKey: 'deadlineDate',
    cell: ({ row }) => {
      const deadline = row.getValue('deadlineDate');
      const isExpired = deadline && new Date(deadline) < new Date();
      return <div className={isExpired ? 'text-red-600' : ''}>{formatDate(deadline)}</div>;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const toggleJobStatusMutation = useMutation(toggleJobStatus, {
        invalidateQueries: 'admin/jobs',
      });

      const handleToggleStatus = (jobId) => {
        return toggleJobStatusMutation.mutateAsync(jobId);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleToggleStatus(row.original._id)}>
              {row.original.isActive ? 'Deactivate' : 'Activate'}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => window.open(`/jobs/${row.original._id}`, '_blank')}>
              <ExternalLink className="h-4 w-4 mr-2" />
              View Public Page
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default adminJobColumns;
