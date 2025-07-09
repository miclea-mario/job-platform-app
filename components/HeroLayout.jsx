import { Header, Link } from '@components';
import { MapPin, SearchIcon } from 'lucide-react';
import { Button } from './ui/button';

const Search = () => {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-full p-2 flex items-center space-x-4 h-[50px]">
      <div className="max-w-[300px] flex items-center space-x-4">
        <div className="flex items-center gap-2">
          <SearchIcon className="text-white/50" />
          <input
            className="bg-transparent outline-none text-white/50 text-sm"
            placeholder="Search job..."
          ></input>
        </div>
        <hr className="h-6 w-[1px] bg-white/20"></hr>
        <div className="flex items-center gap-2">
          <MapPin className="text-white/50" />
          <input
            className="bg-transparent outline-none text-white/50 text-sm"
            placeholder="Location"
          ></input>
        </div>
      </div>
      <button className="rounded-full bg-none text-sm bg-white h-full px-4 hover:bg-primary">
        Search
      </button>
    </div>
  );
};

const HeroLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col cover">
      <Header className="absolute top-0 z-20 w-full">
        <Search />
      </Header>

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
            <Button variant="secondary">For Employers</Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default HeroLayout;
