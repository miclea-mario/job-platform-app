import { SignupForm } from '@components/Forms';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import Spline from '@splinetool/react-spline';

const Page = () => {
  return (
    <div className="relative h-screen flex items-center">
      {/* Spline Background */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://draft.spline.design/W2HiUlfdgL0Ewi6b/scene.splinecode" />
      </div>
      <div className="relative z-10 px-4 max-w-4xl max">
        <h1 className="pointer-events-none font-heading font-semibold text-white lg:text-3xl">
          HorizonHire
        </h1>
        <p className="text-sm text-white mb-8 drop-shadow-md">
          Expand your professional horizons and discover opportunities beyond the boundaries of
          traditional employment
        </p>
        <Card className="bg-white/70 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Create a new account</CardTitle>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
