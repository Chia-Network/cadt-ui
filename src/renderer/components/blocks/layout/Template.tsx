import { ErrorBoundary } from '@/pages';
import { LeftNav } from './LeftNav';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components';

const Template = () => {
  return (
    <ErrorBoundary>
      <div id="app" className="dark:bg-gray-800 w-full h-full">
        <Header />
        <div id="body" className="w-full h-full flex flex-col md:flex-row">
          <aside className="h-full md:w-auto md:flex-none bg-[#4d5c63]" style={{height: 'calc(100% + 5px)'}}>
            <LeftNav />
          </aside>
          <div id="content" className="w-full h-full relative p-2 md:p-0 dark:text-white">
            <div className="h-full">
              <ErrorBoundary>
                <Outlet />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export { Template };
