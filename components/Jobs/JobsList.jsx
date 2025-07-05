import { JobsFiltersContext } from '@context/jobs-filters-context';
import { useInfiniteQuery } from '@hooks';
import { useContext } from 'react';
import JobListSkeleton from './JobListSkeleton';
import JobListSuccess from './JobListSuccess';

const JobsList = () => {
  const { filters } = useContext(JobsFiltersContext);
  const { data, status } = useInfiniteQuery('jobs', filters);

  return (
    <>
      {status === 'loading' && <JobListSkeleton extraClass="col-span-4" />}
      {status === 'success' && <JobListSuccess jobs={data.pages.flat()} extraClass="col-span-4" />}
    </>
  );
};

export default JobsList;
