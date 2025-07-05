import { Pill } from '@components';
import { Field, Input } from '@components/Fields';
import { Button } from '@components/ui/button';
import { classnames } from '@lib';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

const ArrayField = ({ name, placeholder, charactersLimit, elementLimit, ...props }) => {
  const { control, watch, setValue } = useFormContext();
  useFieldArray({
    control,
    name,
    rules: {
      maxLength: elementLimit,
    },
  });
  const [newValue, setNewValue] = useState('');
  const [error, setError] = useState('');

  const values = watch(name) || [];

  const handleChange = (value) => {
    if (elementLimit && values.length >= elementLimit) {
      setError(`You can only add up to ${elementLimit} elements`);
    } else if (values.includes(value)) {
      setError('This value already exists');
    } else if (value.trim() !== '' && !error) {
      const newValues = [...values, value];
      setValue(name, newValues);
      setNewValue('');
      setError('');
    }
  };

  const handleValueChange = (value) => {
    setNewValue(value);
    setError('');
    if (charactersLimit && value.length > charactersLimit) {
      setError(`Value must be less than ${charactersLimit} characters`);
    } else {
      setError('');
    }
  };

  const handlePillClick = (index) => {
    const newValues = values.filter((_, i) => i !== index);
    setValue(name, newValues);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleChange(newValue);
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div {...props}>
      <div className={classnames('flex w-full flex-col gap-4 lg:flex-row', error && 'has-error')}>
        <Field
          as={Input}
          className={error && 'text-red-500'}
          name="value"
          onChange={(e) => handleValueChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          value={newValue}
        />
        <Button type="button" onClick={() => handleChange(newValue)}>
          <Plus className="w-4 h-4" />
          <p>Add</p>
        </Button>
      </div>
      {charactersLimit && (
        <p className="ml-1 mt-1 text-xs text-gray-600">{`${newValue.length}/${charactersLimit}`}</p>
      )}
      {error && <p className="text-[0.8rem] font-medium text-destructive">{error}</p>}
      <div className="mt-3 flex w-full flex-wrap gap-2">
        {values.map((value, index) => (
          <Pill
            key={index}
            className="border flex items-center bg-gray-50 hover:cursor-pointer hover:border-gray-500"
            onClick={() => handlePillClick(index)}
          >
            {value}
            <X className="w-4 h-4 ml-2" />
          </Pill>
        ))}
      </div>
    </div>
  );
};

export default ArrayField;
