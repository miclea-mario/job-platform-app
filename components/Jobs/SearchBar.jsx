import { Combobox } from '@components/Fields';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { JobsFiltersContext } from '@context/jobs-filters-context';
import { useQuery } from '@hooks';
import { MapPin, Search } from 'lucide-react';
import { useContext } from 'react';

const SearchBar = () => {
  const { data, status } = useQuery('cities');
  const { filters, setFilters } = useContext(JobsFiltersContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setFilters({
      city: formData.get('location'),
      title: formData.get('title'),
    });
  };

  const handleCityChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      city: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-4xl">
      <div className="flex-1 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            name="title"
            placeholder="UI/UX Designer"
            defaultValue={filters.title || ''}
            className="pl-9"
          />
        </div>
        <div className="relative w-48">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Combobox
            name="location"
            placeholder="All Cities"
            value={filters.city || 'all'}
            onChange={handleCityChange}
            className="pl-9"
          >
            {status === 'success' &&
              data.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </Combobox>
        </div>
      </div>
      <Button type="submit" size="lg">
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
