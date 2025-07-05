import { classnames } from '@lib';
import { JobCard } from '.';

const JobListSuccess = ({ jobs, extraClass }) => {
  return (
    <div className={classnames('flex flex-col gap-6', extraClass)}>
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
};

export default JobListSuccess;
