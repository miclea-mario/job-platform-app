import { DashboardLayout } from '@components';
import { DatePicker, Email, PlusMinus, TimePicker } from '@components/Fields';
import { Field, Form, HookForm, Submit } from '@components/HookForm';
import { initialValues, validationSchema } from '@examples/models/form';

const Page = () => {
  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false);
  };

  return (
    <DashboardLayout title="React hook forms">
      <div className="prose-sm">
        <HookForm
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4" debug={true}>
            <div className="md:w-1/2">
              <Field as={Email} name="email" label="Basic email field" help="Required info" />
            </div>
            <div className="w-full">
              <Field as={PlusMinus} name="quantity" label="Basic plus-minus field" />
            </div>
            <div className="w-80">
              <Field as={DatePicker} name="checkInDate" label="Check-in date picker" />
            </div>
            <div className="w-80">
              <Field as={TimePicker} name="checkInTime" label="Check-in time picker" />
            </div>
            <Submit className="button full primary">Submit</Submit>
          </Form>
        </HookForm>
      </div>
    </DashboardLayout>
  );
};

export async function getStaticProps() {
  // hide page on production environments
  if (process.env.NODE_ENV === 'production') {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
}

export default Page;
