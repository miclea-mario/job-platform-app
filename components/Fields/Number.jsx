import { Input } from '@components/ui/input';

const Number = (props) => {
  const handleWheel = (event) => {
    // prevents changing value of input[type=number]:focus, when user scrolls down the page
    event.target.blur();
  };

  return <Input type="number" inputMode="number" onWheel={handleWheel} {...props} />;
};

export default Number;
