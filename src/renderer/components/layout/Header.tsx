import React, { useState, useEffect } from 'react';
import { AppLogo } from "@/components";
import { IoSunny, IoMoon } from "react-icons/io5";

const Header: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    // Check if there's a theme preference saved in localStorage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      // Set the theme based on the stored preference
      document.body.classList.toggle('dark', storedTheme === 'dark');
      setIsDarkTheme(storedTheme === 'dark');
    } else {
      // If no preference is stored, use the default (light) theme
      setIsDarkTheme(false);
    }
  }, []);

  const toggleTheme = () => {
    // Toggle the 'dark' class on the <body> tag to switch themes
    const newTheme = isDarkTheme ? 'light' : 'dark';
    document.body.classList.toggle('dark', newTheme === 'dark');
    setIsDarkTheme(!isDarkTheme);
    // Store the theme preference in localStorage
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="border-t-8 border-green-400 pt-1 pb-1 w-screen h-16 bg-[#00242C] dark:bg-gray-800 dark:border-gray-600">
      <div className="flex justify-between items-center h-full px-6 max-w-screen-xl mx-auto">
        <div className="flex items-center h-full mr-5">
          {/* App logo with a 5px left margin */}
          <AppLogo width="100%" height="80%" className="" />
        </div>
        <div className="flex items-center gap-5">
          {/* Theme toggle button */}
          <button onClick={toggleTheme} className="text-white flex items-center justify-center">
            {/* Dynamically switch the icon based on the isDarkTheme state */}
            {isDarkTheme ? <IoSunny className="h-5 w-5" /> : <IoMoon className="h-5 w-5" />}
          </button>
          <div className="text-white">
            todo: connect button and locale selector
          </div>
        </div>
      </div>
    </div>
  );
};

export { Header };
