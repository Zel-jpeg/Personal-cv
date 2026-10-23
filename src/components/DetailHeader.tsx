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
        <a className="site-monogram" href="/" aria-label="Azel Villanueva home">
          AV<span>.</span>
        </a>
        <nav className="detail-desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle {...props} />
          <MobileMenu links={links} />
        </div>
      </div>
    </header>
  );
}
