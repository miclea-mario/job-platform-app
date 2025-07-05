import { Checkbox as CheckboxUI } from '@components/ui/checkbox';

const Checkbox = ({ children, ...props }) => {
  return (
    <div className="mt-2">
      <label className="inline-flex items-center ">
        <CheckboxUI type="checkbox" className="checkbox" {...props} />
        <span className="ml-2">{children}</span>
      </label>
    </div>
  );
};

export default Checkbox;
