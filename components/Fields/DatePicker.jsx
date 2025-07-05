import { Button } from '@components/ui/button';
import { Calendar } from '@components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';
import { isValidDate } from '@functions';
import { classnames } from '@lib';
import { format } from 'date-fns';
import { isFunction } from 'lodash';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const DatePicker = ({ value: initialValue, onChange, calendarProps = {}, className, ...props }) => {
  const [value, setValue] = useState(initialValue);

  const handleSelect = (date) => {
    const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';
    setValue(formattedDate);
  };

  useEffect(() => {
    if (isFunction(onChange)) {
      try {
        onChange(isValidDate(value) ? value : '');
      } catch {
        onChange('');
      }
    }
  }, [value]);

  const date = value ? new Date(value) : undefined;
  const defaultDate = isValidDate(new Date(initialValue)) ? new Date(initialValue) : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={classnames(
            'justify-start bg-white text-left font-normal w-full',
            !date && 'text-muted-foreground',
            className
          )}
          {...props}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          defaultMonth={defaultDate}
          initialFocus
          captionLayout="dropdown"
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
