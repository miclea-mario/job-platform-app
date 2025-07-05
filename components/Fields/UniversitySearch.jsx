import { Button } from '@components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';
import { useDebounce, useQuery } from '@hooks';
import { classnames } from '@lib';
import { Check, ChevronsUpDown, Plus } from 'lucide-react';
import { useState } from 'react';

const UniversitySearch = ({ value, onChange, placeholder = 'Search for a university...' }) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { data: universities } = useQuery(
    debouncedSearchQuery
      ? `http://universities.hipolabs.com/search?name=${encodeURIComponent(debouncedSearchQuery)}`
      : 'http://universities.hipolabs.com/search?name='
  );

  const handleSelect = (selectedValue) => {
    if (selectedValue === 'custom') {
      onChange(searchQuery);
    } else {
      onChange(selectedValue === value ? '' : selectedValue);
    }
    setOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-white"
          >
            <span className="truncate">{value || placeholder}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search universities..."
              onValueChange={setSearchQuery}
              className="h-9"
            />
            <CommandList className="max-h-[300px] overflow-y-auto">
              <CommandEmpty>
                <div className="py-2 px-2">
                  <p className="text-sm text-muted-foreground">No universities found.</p>
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 mt-2"
                      onClick={() => handleSelect('custom')}
                    >
                      <Plus className="h-4 w-4" />
                      Add "{searchQuery}" as custom university
                    </Button>
                  )}
                </div>
              </CommandEmpty>
              <CommandGroup>
                {universities?.map((university) => (
                  <CommandItem
                    key={university.name}
                    value={university.name}
                    onSelect={handleSelect}
                  >
                    <Check
                      className={classnames(
                        'mr-2 h-4 w-4 shrink-0',
                        value === university.name ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    <span className="truncate">{university.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              {searchQuery && universities?.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem value="custom" onSelect={handleSelect}>
                      <Plus className="mr-2 h-4 w-4 shrink-0" />
                      <span className="truncate">Add "{searchQuery}" as custom university</span>
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UniversitySearch;
