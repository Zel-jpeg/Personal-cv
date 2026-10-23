import { Moon, Sun } from 'lucide-react';

export type ThemeToggleProps = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export default function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  return (
    <button
      className="theme-toggle"
      id="theme-toggle"
      type="button"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      aria-pressed={theme === 'dark'}
      onClick={toggleTheme}
    >
      {theme === 'dark' ? (
        <Moon size={17} aria-hidden="true" />
      ) : (
        <Sun size={17} aria-hidden="true" />
      )}
    </button>
  );
}
