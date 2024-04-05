// ThemeSelector.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoSunny, IoMoon } from "react-icons/io5";
import { toggleTheme } from '@/store/slices/app';
import { RootState } from '@/store';

const ThemeSelector: React.FC = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state: RootState) => state.app.isDarkTheme);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <button onClick={handleToggleTheme} className="text-white flex items-center justify-center">
      {isDarkTheme ? <IoSunny className="h-5 w-5" /> : <IoMoon className="h-5 w-5" />}
    </button>
  );
};

export { ThemeSelector };
