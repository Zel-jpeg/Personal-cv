import profilePhoto from '../assets/profile-zel.webp';

type SocialLink = {
  kind: 'github' | 'email';
  label: string;
  href: string;
};

export const contactEmail = 'azelmv14@gmail.com';

// Add LinkedIn here once the owner supplies their actual profile URL.
export const socialLinks: SocialLink[] = [
  {
    kind: 'github',
    label: 'GitHub profile',
    href: 'https://github.com/Zel-jpeg',
  },
  {
    kind: 'email',
    label: 'Email Azel',
    href: `mailto:${contactEmail}`,
  },
];

// Temporary images requested by the owner. Replace with personal hobby photos later.
export const personalPhotos = [
  { src: profilePhoto, alt: 'Temporary personal photo 1' },
  { src: profilePhoto, alt: 'Temporary personal photo 2' },
  { src: profilePhoto, alt: 'Temporary personal photo 3' },
];
export const outsideIntro =
  'A little space for life beyond the screen. Personal interests and moments will live here as this portfolio grows.';
export const hobbies: string[] = [];
