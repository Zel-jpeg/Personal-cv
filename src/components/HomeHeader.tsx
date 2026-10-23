import DetailHeader from './DetailHeader';
import type { ThemeToggleProps } from './ThemeToggle';
import { useMobileLayout } from '../hooks/useMobileLayout';

export default function HomeHeader(props: ThemeToggleProps) {
  const mobile = useMobileLayout();
  if (!mobile) return null;
  return (
    <div className="home-mobile-header">
      <DetailHeader home {...props} />
    </div>
  );
}
