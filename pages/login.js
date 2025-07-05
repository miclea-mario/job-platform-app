import { LoginForm } from '@components/Forms';
import Spline from '@splinetool/react-spline';

const Page = () => {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <h1 className="pointer-events-none font-heading font-semibold text-accent lg:text-3xl">
            HorizonHire
          </h1>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Spline scene="https://draft.spline.design/W2HiUlfdgL0Ewi6b/scene.splinecode" />
      </div>
    </main>
  );
};

export default Page;
