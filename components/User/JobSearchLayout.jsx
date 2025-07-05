import { Header } from '@components';
import { SearchBar } from '@components/Jobs';
import HeaderMenu from './HeaderMenu';

const JobSearchLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col p-1">
      {/* Hero Section */}
      <div className="relative w-full">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center brightness-50 rounded-3xl"
          style={{ backgroundImage: 'url(/images/cover.jpg)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/70 to-accent/50 rounded-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Header>
            <HeaderMenu extraClass="text-muted" />
          </Header>

          {/* Hero Content */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-accent mb-6">
                Find Your Dream Job Today
              </h1>
              <p className="text-lg sm:text-xl text-background mb-8">
                Discover thousands of job opportunities from top companies and employers
              </p>
              <div className="max-w-2xl mx-auto">
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
};

export default JobSearchLayout;
