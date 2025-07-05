import { JobFilters, JobsList } from '@components/Jobs';
import { JobSearchLayout } from '@components/User';
import { JobsFiltersProvider } from '@context/jobs-filters-context';

const Page = () => {
  return (
    <JobsFiltersProvider>
      <JobSearchLayout>
        <div className="max grid grid-cols-5 gap-5">
          <div>
            <JobFilters />
          </div>
          <JobsList extraClass="col-span-4" />
        </div>
      </JobSearchLayout>
    </JobsFiltersProvider>
  );
};

export default Page;
