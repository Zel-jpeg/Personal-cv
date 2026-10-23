import { Mail } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { socialLinks } from '../data/personal';

const icons = { github: SiGithub, email: Mail };

export default function SocialLinks() {
  return (
    <nav className="profile-socials" aria-label="Social and contact links">
      {socialLinks.map((link) => {
        const Icon = icons[link.kind];
        return (
          <a
            key={link.kind}
            href={link.href}
            aria-label={link.label}
            title={link.label}
            {...(link.kind !== 'email'
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            <Icon size={19} aria-hidden="true" />
          </a>
        );
      })}
    </nav>
  );
}
