import { Input } from '@components/ui/input';

const Phone = (props) => {
  return <Input type="tel" inputMode="tel" {...props} />;
};

export default Phone;
