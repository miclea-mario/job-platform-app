import { LoadMoreOnClick } from '@components/Buttons';
import { TableError, TableFacetedFilter, TableLoading, TableSuccess } from '@components/Tables';
import { Button } from '@components/ui/button';
import { APPLICATION_STATUS } from '@constants/application';
import applicationColumns from '@data/user/application-columns';
import { useInfiniteQuery, useQuery } from '@hooks';
import { X } from 'lucide-react';
import { useState } from 'react';

const ApplicationsTable = () => {
  const [options, setOptions] = useState({});
  const { data, status, ...props } = useInfiniteQuery('user/applications', options);

  return (
    <>
      {status === 'loading' && <TableLoading columns={applicationColumns} rows={5} />}
      {status === 'error' && <TableError name="jobs" columns={applicationColumns} />}
      {status === 'success' && (
        <>
          <TableSuccess
            columns={applicationColumns}
            filtersToolbar={<TableFilterToolbar options={options} setOptions={setOptions} />}
            data={data}
            {...props}
          />
          <div className="px-4 sm:p-4">
            <LoadMoreOnClick {...props} />
          </div>
        </>
      )}
    </>
  );
};

const TableFilterToolbar = ({ options, setOptions }) => {
  const { data } = useQuery('user/applications');
  const jobTitles = data?.pages.map(({ job }) => {
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
