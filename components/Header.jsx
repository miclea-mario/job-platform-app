import { Link, Profile } from '@components';

const Header = ({ children, ...props }) => {
  return (
    <nav className="w-full select-none" {...props}>
      <div className="max flex w-full items-center justify-between gap-4 p-4 lg:px-8">
        <div className="flex justify-between w-full gap-10">
          <div className="flex items-center gap-20">
            <Link href="/" className="flex items-center gap-2 rounded-lg no-underline">
              <h1 className="pointer-events-none font-heading font-semibold text-accent lg:text-3xl">
                HorizonHire
              </h1>
            </Link>
            {children}
          </div>

          <Profile />
        </div>
      </div>
    </nav>
  );
};

export default Header;
