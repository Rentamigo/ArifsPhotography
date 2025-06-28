import React, { useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, setTheme } = useTheme();
  const [showOptions, setShowOptions] = useState(false);

  const handleQuickToggle = () => {
    toggleTheme();
  };

  const handleThemeSelect = (selectedTheme: 'light' | 'dark' | 'system') => {
    if (selectedTheme === 'system') {
      // Detect system preference and apply
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemTheme = prefersDark ? 'dark' : 'light';
      setTheme(systemTheme);
      // Remove theme from localStorage to follow system
      localStorage.removeItem('theme');
    } else {
      setTheme(selectedTheme);
    }
    setShowOptions(false);
  };

  const getCurrentIcon = () => {
    if (theme === 'light') {
      return <Sun className="w-4 h-4 sm:w-5 sm:h-5" />;
    } else {
      return <Moon className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  return (
    <div className="relative">
      {/* Quick Toggle Button */}
      <button
        onClick={handleQuickToggle}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowOptions(!showOptions);
        }}
        className={`p-2 sm:p-2.5 rounded-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500/50 ${
          theme === 'light'
            ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            : 'bg-gray-800 hover:bg-gray-700 text-gray-200'
        }`}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        title={`Current: ${theme} mode (right-click for options)`}
      >
        <div className="relative">
          {getCurrentIcon()}
          
          {/* Animated background */}
          <div className={`absolute inset-0 rounded-lg transition-all duration-500 ${
            theme === 'light'
              ? 'bg-yellow-400/20 scale-0 group-hover:scale-100'
              : 'bg-blue-400/20 scale-0 group-hover:scale-100'
          }`} />
        </div>
      </button>

      {/* Extended Options Dropdown */}
      {showOptions && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowOptions(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-50 min-w-[180px] overflow-hidden">
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-3 py-2 uppercase tracking-wide">
                Theme Options
              </div>
              
              <button
                onClick={() => handleThemeSelect('light')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left ${
                  theme === 'light'
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Sun className="w-4 h-4 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm">Light</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Bright and clean</div>
                </div>
                {theme === 'light' && (
                  <div className="w-2 h-2 bg-red-500 rounded-full ml-auto" />
                )}
              </button>
              
              <button
                onClick={() => handleThemeSelect('dark')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left ${
                  theme === 'dark'
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Moon className="w-4 h-4 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm">Dark</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Easy on the eyes</div>
                </div>
                {theme === 'dark' && (
                  <div className="w-2 h-2 bg-red-500 rounded-full ml-auto" />
                )}
              </button>
              
              <button
                onClick={() => handleThemeSelect('system')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                <Monitor className="w-4 h-4 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm">System</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Follow system setting</div>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeToggle;