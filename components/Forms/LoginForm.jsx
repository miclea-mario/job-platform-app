import { login } from '@api/identity';
import { Link } from '@components';
import { Email, Password, Recaptcha } from '@components/Fields';
import { Field, Fieldset, HookForm, Submit } from '@components/HookForm';
import { initialValues, validationSchema } from '@models/login';
import { useRef } from 'react';

const LoginForm = () => {
  const ref = useRef(null);
  const handleSubmit = async (values) => {
    await login(ref, values);
  };

  return (
    <HookForm
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center mb-4">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <Fieldset name="email" label="Your email">
          <Field id="email" name="email" as={Email} autoFocus={true} />
        </Fieldset>

        <Fieldset name="password" label="Your password" link="/forgot" linkText="Forgot password?">
          <Field id="password" name="password" as={Password} />
        </Fieldset>

        <Submit className="w-full">Login</Submit>
        <Recaptcha ref={ref} />
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </HookForm>
  );
};

export default LoginForm;
