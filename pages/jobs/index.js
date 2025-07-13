import { JobFilters, JobsList } from '@components/Jobs';
import { JobSearchLayout } from '@components/User';
import { JobsFiltersProvider } from '@context/jobs-filters-context';

const Page = () => {
  return (
    <JobsFiltersProvider>
      <JobSearchLayout>
        <div className="max grid grid-cols-1 lg:grid-cols-5 gap-3 lg:gap-5">
          <div className="lg:col-span-1">
            <JobFilters />
          </div>
          <div className="lg:col-span-4">
            <JobsList />
          </div>
        </div>
      </JobSearchLayout>
    </JobsFiltersProvider>
  );
};

export default Page;
