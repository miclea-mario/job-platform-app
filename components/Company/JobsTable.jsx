import { LoadMoreOnClick } from '@components/Buttons';
import { TableError, TableLoading, TableSuccess } from '@components/Tables';
import jobColumns from '@data/company/job-columns';
import { useInfiniteQuery } from '@hooks';

const JobsTable = () => {
  const { data, status, ...props } = useInfiniteQuery('company/jobs');

  return (
    <>
      {status === 'loading' && <TableLoading columns={jobColumns} rows={5} />}
      {status === 'error' && <TableError name="jobs" columns={jobColumns} />}
      {status === 'success' && (
        <>
          <TableSuccess columns={jobColumns} data={data} {...props} />
          <div className="px-4 sm:p-4">
            <LoadMoreOnClick {...props} />
          </div>
        </>
      )}
    </>
  );
};

export default JobsTable;
