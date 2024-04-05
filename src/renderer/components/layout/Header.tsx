// Header.js
import React from 'react';
import { AppLogo, ThemeSelector } from "@/components";

const Header: React.FC = () => {
  return (
    <div className="border-t-8 border-green-400 pt-1 pb-1 w-screen h-16 bg-[#00242C] dark:bg-gray-800 dark:border-gray-600">
      <div className="flex justify-between items-center h-full px-6 max-w-screen-xl mx-auto">
        <div className="flex items-center h-full mr-5">
          <AppLogo width="100%" height="80%" type="" />
        </div>
        <div className="flex items-center gap-5">
          <ThemeSelector />
          <div className="text-white">
            todo: connect button and locale selector
          </div>
        </div>
      </div>
    </div>
  );
};

export { Header };
