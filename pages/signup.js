import { SignupForm } from '@components/Forms';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';

const Page = () => {
  return (
    <div className="relative h-screen flex items-center cover flex-col justify-center">
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
  );
};

export default Page;
