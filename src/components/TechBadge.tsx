import type { IconType } from 'react-icons';
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiVite,
  SiPython,
  SiDart,
  SiTailwindcss,
  SiBootstrap,
  SiNodedotjs,
  SiPhp,
  SiDjango,
  SiLaravel,
  SiPostgresql,
  SiMysql,
  SiGit,
  SiGithub,
  SiFigma,
  SiPrettier,
} from 'react-icons/si';
import { Code2 } from 'lucide-react';

const icons: Record<string, { icon: IconType; color: string }> = {
  HTML: { icon: SiHtml5, color: '#e76536' },
  CSS: { icon: SiCss, color: '#428bd0' },
  JavaScript: { icon: SiJavascript, color: '#c2a010' },
  TypeScript: { icon: SiTypescript, color: '#3178c6' },
  React: { icon: SiReact, color: '#24a8cb' },
  Vite: { icon: SiVite, color: '#9870ef' },
  Python: { icon: SiPython, color: '#4988b7' },
  Dart: { icon: SiDart, color: '#2196b3' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#16a8ba' },
  Bootstrap: { icon: SiBootstrap, color: '#9565d7' },
  'Node.js': { icon: SiNodedotjs, color: '#68a357' },
  PHP: { icon: SiPhp, color: '#888ac2' },
  Django: { icon: SiDjango, color: '#499477' },
  Laravel: { icon: SiLaravel, color: '#ef645b' },
  PostgreSQL: { icon: SiPostgresql, color: '#628ab3' },
  MySQL: { icon: SiMysql, color: '#bf8c48' },
  Git: { icon: SiGit, color: '#e66b4a' },
  GitHub: { icon: SiGithub, color: 'currentColor' },
  Figma: { icon: SiFigma, color: '#bb69d5' },
  Prettier: { icon: SiPrettier, color: '#ba8a6c' },
};

export default function TechBadge({
  name,
  compact = false,
}: {
  name: string;
  compact?: boolean;
}) {
  const entry = icons[name];
  const Icon = entry?.icon ?? Code2;
  return (
    <span className={compact ? 'tech-icon' : 'tech-badge'} title={name}>
      <Icon aria-hidden="true" style={{ color: entry?.color }} />
      <span className={compact ? 'sr-only' : undefined}>{name}</span>
    </span>
  );
}
