import { Link } from '@components';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { useFormContext } from 'react-hook-form';

const Fieldset = ({ label, help, name, children, link, linkText }) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <div className="flex justify-between">
            {label && <FormLabel>{label}</FormLabel>}
            {linkText && (
              <Link
                href={link}
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                {linkText}
              </Link>
            )}
          </div>
          <FormControl>{children}</FormControl>
          <FormDescription>{help}</FormDescription>
          <FormMessage className="first-letter:capitalize" />
        </FormItem>
      )}
    />
  );
};

export default Fieldset;
