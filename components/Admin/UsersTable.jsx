import { LoadMoreOnClick } from '@components/Buttons';
import { TableError, TableLoading, TableSuccess } from '@components/Tables';
import usersColumns from '@data/admin/users-columns';
import { useInfiniteQuery } from '@hooks';

const UsersTable = ({ options }) => {
  const { data, status, ...props } = useInfiniteQuery('admin/users', options);

  return (
    <>
      {status === 'loading' && <TableLoading columns={usersColumns.length} rows={5} />}
      {status === 'error' && <TableError name="staff" columns={usersColumns} />}
      {status === 'success' && (
        <>
          <TableSuccess name="staff" columns={usersColumns} data={data} {...props} />
          <div className="px-4 sm:p-4">
            <LoadMoreOnClick {...props} />
          </div>
        </>
      )}
    </>
  );
};

export default UsersTable;
