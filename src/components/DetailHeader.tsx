import { Link } from 'react-router';
import ThemeToggle from './ThemeToggle';
import type { ThemeToggleProps } from './ThemeToggle';
import MobileMenu from './MobileMenu';
import { navigation } from '../data/navigation';

export default function DetailHeader({
  home = false,
  ...props
}: ThemeToggleProps & { home?: boolean }) {
  const links = home
    ? navigation.map((item) => ({ label: item.label, href: `/#${item.id}` }))
    : [
        { label: 'Home', href: '/' },
        { label: 'Projects', href: '/projects' },
        { label: 'Technologies', href: '/tech-stack' },
        { label: 'Certifications', href: '/certifications' },
        { label: 'Community', href: '/community' },
        { label: 'Contact', href: '/#contact' },
      ];
  return (
    <header className="detail-site-header">
      <div>
        <Link
          className="site-monogram"
          to="/"
          aria-label={
            home ? 'Back to Azel Villanueva profile' : 'Azel Villanueva home'
          }
        >
          AV
        </Link>
        <nav className="detail-desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.href} to={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle {...props} />
          <MobileMenu links={links} showPrint={home} />
        </div>
      </div>
    </header>
  );
}
