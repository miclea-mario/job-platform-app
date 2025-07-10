import { deleteJob, updateJobVisibility } from '@api/company';
import { AreYouSure } from '@components';
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
import { MoreHorizontal } from 'lucide-react';

const jobColumns = [
  {
    header: ({ column }) => <TableColumnHeader column={column} title="Title" />,
    accessorKey: 'title',
  },
  {
    header: ({ column }) => <TableColumnHeader column={column} title="Workplace" />,
    accessorKey: 'workplaceType',
  },
  {
    header: ({ column }) => <TableColumnHeader column={column} title="Type" />,
    accessorKey: 'employmentType',
    cell: ({ row }) => <Badge variant="outline">{row.getValue('employmentType')}</Badge>,
  },
  {
    header: ({ column }) => <TableColumnHeader column={column} title="Experience" />,
    accessorKey: 'experienceLevel',
    cell: ({ row }) => <Badge variant="outline">{row.getValue('experienceLevel')}</Badge>,
  },
  {
    header: ({ column }) => <TableColumnHeader column={column} title="Status" />,
    accessorKey: 'isActive',
    cell: ({ row }) => (
      <Badge variant={row.getValue('isActive') ? 'success' : 'secondary'}>
        {row.getValue('isActive') ? 'Active' : 'Inactive'}
      </Badge>
    ),
  },
  {
    header: ({ column }) => <TableColumnHeader column={column} title="Applications" />,
    accessorKey: 'applicationCount',
    cell: ({ row }) => row.getValue('applicationCount') || 0,
  },
  {
    header: ({ column }) => <TableColumnHeader column={column} title="Posted Date" />,
    accessorKey: 'createdAt',
    cell: ({ row }) => formatDate(row.getValue('createdAt')),
  },
  {
    header: ({ column }) => <TableColumnHeader column={column} title="Deadline" />,
    accessorKey: 'deadlineDate',
    cell: ({ row }) => formatDate(row.getValue('deadlineDate')),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const deleteJobMutation = useMutation(deleteJob, {
        invalidateQueries: 'company/jobs',
      });

      const updateJobVisibilityMutation = useMutation(updateJobVisibility, {
        invalidateQueries: 'company/jobs',
      });

      const handleJobVisibility = (jobId, isActive) => {
        return updateJobVisibilityMutation.mutateAsync({ id: jobId, isActive });
      };

      const handleDeleteJob = (jobId) => {
        return deleteJobMutation.mutateAsync(jobId);
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {row.original.isActive ? (
                <DropdownMenuItem onClick={() => handleJobVisibility(row.original._id, false)}>
                  Deactivate
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => handleJobVisibility(row.original._id, true)}>
                  Activate
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => (window.location.href = `/company/jobs/${row.original._id}`)}
              >
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => (window.location.href = `/company/jobs/${row.original._id}/edit`)}
              >
                Edit Job
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onSelect={(e) => e.preventDefault()}>
                <AreYouSure
                  iAmSure={() => handleDeleteJob(row.original._id)}
                  button={<span>Delete</span>}
                >
                  You will delete {row.original.title} job.
                </AreYouSure>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];

export default jobColumns;
