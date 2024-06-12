import { ErrorBoundary } from '@/pages';
import { LeftNav } from './LeftNav';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components';

const Template = () => {
  return (
    <ErrorBoundary>
      <div id="app" className="dark:bg-gray-800 w-full h-full">
        <Header />
        <div id="body" className="w-full h-full flex md:flex-row">
          <LeftNav />
          <div id="content" className="w-full h-full relative dark:text-white">
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export { Template };
