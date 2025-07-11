import { Header, Link } from '@components';
import { Button } from './ui/button';

const HeroLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col cover">
      <Header className="absolute top-0 z-20 w-full" />

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        <div className="relative z-10 px-4 max-w-4xl max">
          <h1 className="text-5xl font-light mb-4 text-white drop-shadow-lg">
            Your Career Horizon Awaits
          </h1>
          <p className="text-xl text-white mb-8 drop-shadow-md">
            Expand your professional horizons and discover opportunities beyond the boundaries of
            traditional employment
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/jobs">Browse Jobs</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default HeroLayout;
