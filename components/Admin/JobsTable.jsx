import { LoadMoreOnClick } from '@components/Buttons';
import { TableError, TableLoading, TableSuccess } from '@components/Tables';
import jobsColumns from '@data/admin/jobs-columns';
import { useInfiniteQuery } from '@hooks';

const JobsTable = ({ options = {} }) => {
  const { data, status, ...props } = useInfiniteQuery('admin/jobs', options);

  return (
    <>
      {status === 'loading' && <TableLoading columns={jobsColumns} />}
      {status === 'error' && <TableError name="jobs" columns={jobsColumns} />}
      {status === 'success' && (
        <>
          <TableSuccess name="jobs" columns={jobsColumns} data={data} {...props} />
          <div className="px-4 sm:p-4">
            <LoadMoreOnClick {...props} />
          </div>
        </>
      )}
    </>
  );
};

export default JobsTable;
