import { Form, Submit } from '@components/HookForm';

const UserForm = () => {
  return (
    <Form className="flex flex-col gap-10">
      <Submit className="w-full">Update Company Profile</Submit>
    </Form>
  );
};

export default UserForm;
