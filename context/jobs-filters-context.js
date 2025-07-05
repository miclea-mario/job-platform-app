import { useSearchParams } from 'next/navigation';
import { createContext, useState } from 'react';

export const JobsFiltersContext = createContext(null);

export const JobsFiltersProvider = ({ children }) => {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    employmentType: searchParams.get('employmentType') || '',
    workplaceType: searchParams.get('workplaceType') || '',
    experienceLevel: searchParams.get('experienceLevel') || '',
    minimumQualification: searchParams.get('minimumQualification') || '',
    city: searchParams.get('city') || '',
    salaryMin: searchParams.get('salaryMin') || '',
    salaryMax: searchParams.get('salaryMax') || '',
    title: searchParams.get('title') || '',
  });

  return (
    <JobsFiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </JobsFiltersContext.Provider>
  );
};
