import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoMoon, IoSunny } from 'react-icons/io5';
import { toggleThemeMode } from '@/store/slices/app'; // Adjust the import path as necessary
import { RootState } from '@/store'; // Adjust the import path as necessary

const ThemeModeSelector: React.FC = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state: RootState) => state.app.isDarkTheme);

  useEffect(() => {
    // Modify the document body class based on the isDarkTheme state
    document.body.classList.toggle('dark', isDarkTheme);
  }, [isDarkTheme]); // This effect depends on isDarkTheme, so it runs whenever isDarkTheme changes

  const handleToggleTheme = () => {
    dispatch(toggleThemeMode());
  };

  return (
    <button onClick={handleToggleTheme} className="text-white flex items-center justify-center">
      {isDarkTheme ? <IoSunny className="h-5 w-5" /> : <IoMoon className="h-5 w-5" />}
    </button>
  );
};

export { ThemeModeSelector };
