import { LoadMoreOnClick } from '@components/Buttons';
import { Input } from '@components/Fields';
import { TableError, TableFacetedFilter, TableLoading, TableSuccess } from '@components/Tables';
import { Button } from '@components/ui/button';
import { APPLICATION_STATUS } from '@constants/application';
import applicationColumns from '@data/company/application-columns';
import { useDisclosure, useInfiniteQuery, useQuery } from '@hooks';
import { X } from 'lucide-react';
import { useState } from 'react';
import ApplicationDetailsSheet from './ApplicationDetails/ApplicationDetailsSheet';

const ApplicationsTable = () => {
  const [options, setOptions] = useState({});
  const { data, status, ...props } = useInfiniteQuery('company/applications', options);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const { isOpen, show, hide } = useDisclosure();

  const applicationColumnsWithDetails = [
    ...applicationColumns.slice(0, -1),
    {
      id: 'actions',
      cell: ({ row }) => {
        const application = row.original;
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedApplication(application);
                show();
              }}
            >
              View Details
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      {status === 'loading' && <TableLoading columns={applicationColumnsWithDetails} rows={5} />}
      {status === 'error' && <TableError name="jobs" columns={applicationColumnsWithDetails} />}
      {status === 'success' && (
        <>
          <TableSuccess
            columns={applicationColumnsWithDetails}
            filtersToolbar={<TableFilterToolbar options={options} setOptions={setOptions} />}
            data={data}
            {...props}
          />
          <div className="px-4 sm:p-4">
            <LoadMoreOnClick {...props} />
          </div>
        </>
      )}
      {isOpen && (
        <ApplicationDetailsSheet application={selectedApplication} isOpen={isOpen} hide={hide} />
      )}
    </>
  );
};

const TableFilterToolbar = ({ options, setOptions }) => {
  const { data } = useQuery('company/jobs');
  const jobTitles = data?.pages.map((job) => {
    return {
      label: job.title,
      value: job.id,
    };
  });

  // Match score options (for filtering by AI match score ranges)
  const matchScoreOptions = [
    { label: 'High Match (80%+)', value: 'high' },
    { label: 'Medium Match (50-79%)', value: 'medium' },
    { label: 'Low Match (0-49%)', value: 'low' },
  ];

  const handleFilterChange = (key, values) => {
    setOptions({
      ...options,
      [key]: values.length > 0 ? values.join(',') : null,
    });
  };

  return (
    <div className="flex flex-col lg:flex-row w-full items-start space-y-2 mb-2 lg:mb-0 lg:space-x-2 lg:space-y-0">
      <Input
        placeholder="Search applicants..."
        value={options.keyword || ''}
        onChange={(e) =>
          setOptions({
            ...options,
            keyword: e.target.value || null,
          })
        }
        className="h-8 w-full lg:w-[250px]"
      />

      {/* Status filter */}
      <TableFacetedFilter
        title="Status"
        multiSelect={true}
        options={Object.values(APPLICATION_STATUS).map((status) => ({
          label: status.charAt(0).toUpperCase() + status.slice(1),
          value: status,
        }))}
        selectedValues={options.status?.split(',') || []}
        onFilterChange={(values) => handleFilterChange('status', values)}
      />

      {/* Match Score filter */}
      <TableFacetedFilter
        title="Match Score"
        multiSelect={true}
        options={matchScoreOptions}
        selectedValues={options.matchScore?.split(',') || []}
        onFilterChange={(values) => handleFilterChange('matchScore', values)}
      />

      {jobTitles && (
        <TableFacetedFilter
          title="Job Position"
          multiSelect={false}
          options={jobTitles}
          selectedValues={options.jobId?.split(',') || []}
          onFilterChange={(values) => handleFilterChange('jobId', values)}
        />
      )}

      {/* Reset filters button */}
      {Object.values(options).some((value) => value !== null && value !== '') && (
        <Button
          variant="ghost"
          className="h-8 px-2 lg:px-3"
          onClick={() =>
            setOptions({
              keyword: null,
              status: null,
              matchScore: null,
              jobId: null,
            })
          }
        >
          Reset
          <X className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default ApplicationsTable;
