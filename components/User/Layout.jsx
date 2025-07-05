import { Header } from '@components';
import HeaderMenu from './HeaderMenu';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <div className="w-full z-50">
        <Header>
          <HeaderMenu />
        </Header>
      </div>

      {/* Main Content */}
      <main className="max px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
};

export default Layout;
