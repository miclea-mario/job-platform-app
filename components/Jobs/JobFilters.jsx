import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import {
  EMPLOYMENT_TYPE,
  EXPERIENCE_LEVEL,
  MINIMUM_QUALIFICATION,
  WORKPLACE_TYPE,
} from '@constants/job';
import { JobsFiltersContext } from '@context/jobs-filters-context';
import { SlidersHorizontal, X } from 'lucide-react';
import { useCallback, useContext } from 'react';

const JobFilters = () => {
  const context = useContext(JobsFiltersContext);

  if (!context) {
    throw new Error('JobFilters must be used within a JobsFiltersProvider');
  }

  const { filters, setFilters } = context;

  const updateFilters = useCallback(
    (newFilters) => {
      setFilters(newFilters);
      // Convert 'all' values to empty strings for the API
      const apiFilters = Object.entries(newFilters).reduce((acc, [key, value]) => {
        acc[key] = value === 'all' ? '' : value;
        return acc;
      }, {});
      setFilters((prev) => ({ ...prev, ...apiFilters }));
    },
    [setFilters, setFilters]
  );

  const clearFilters = useCallback(() => {
    const emptyFilters = {
      employmentType: '',
      workplaceType: '',
      experienceLevel: '',
      minimumQualification: '',
      city: '',
      salaryMin: '',
      salaryMax: '',
      title: '',
    };
    setFilters(emptyFilters);
    setFilters((prev) => ({ ...prev, ...emptyFilters }));
  }, [setFilters]);

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === 'city' || key === 'salaryMin' || key === 'salaryMax') {
      return value !== '';
    }
    return value !== 'all';
  });

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          <h3 className="font-semibold">Filters</h3>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-2" />
            Clear all
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Employment Type */}
        <div className="space-y-2">
          <Label>Employment Type</Label>
          <Select
            value={filters.employmentType}
            onValueChange={(value) => updateFilters({ ...filters, employmentType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select employment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {Object.values(EMPLOYMENT_TYPE).map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Workplace Type */}
        <div className="space-y-2">
          <Label>Workplace Type</Label>
          <Select
            value={filters.workplaceType}
            onValueChange={(value) => updateFilters({ ...filters, workplaceType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select workplace type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {Object.values(WORKPLACE_TYPE).map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Experience Level */}
        <div className="space-y-2">
          <Label>Experience Level</Label>
          <Select
            value={filters.experienceLevel}
            onValueChange={(value) => updateFilters({ ...filters, experienceLevel: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {Object.values(EXPERIENCE_LEVEL).map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Minimum Qualification */}
        <div className="space-y-2">
          <Label>Minimum Qualification</Label>
          <Select
            value={filters.minimumQualification}
            onValueChange={(value) => updateFilters({ ...filters, minimumQualification: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select minimum qualification" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Qualifications</SelectItem>
              {Object.values(MINIMUM_QUALIFICATION).map((qualification) => (
                <SelectItem key={qualification} value={qualification}>
                  {qualification}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Salary Range */}
        <div className="space-y-2">
          <Label>Salary Range (€/month)</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.salaryMin}
              onChange={(e) => updateFilters({ ...filters, salaryMin: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.salaryMax}
              onChange={(e) => updateFilters({ ...filters, salaryMax: e.target.value })}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default JobFilters;
