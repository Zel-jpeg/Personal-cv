import ThemeToggle from './ThemeToggle';
import type { ThemeToggleProps } from './ThemeToggle';

export default function DetailHeader(props: ThemeToggleProps) {
  return (
    <header className="detail-site-header">
      <div>
        <a className="site-monogram" href="/" aria-label="Azel Villanueva home">
          AV<span>.</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="/projects">Projects</a>
          <a href="/tech-stack">Technologies</a>
          <a href="/#contact">Contact</a>
          <ThemeToggle {...props} />
        </nav>
      </div>
    </header>
  );
}
