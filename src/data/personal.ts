import pitchingTeamPhoto from '../assets/community/pitching-team-01-preview.webp';
import pitchingCandidPhoto from '../assets/community/pitching-behind-scenes-preview.webp';
import sakyanTeamPhoto from '../assets/community/sakyan-prototype-team-preview.webp';
import profilePhoto from '../assets/profile-zel.webp';

type SocialLink = {
  kind: 'github' | 'linkedin' | 'email';
  label: string;
  href: string;
};

export const contactEmail = 'azelmv14@gmail.com';

export const socialLinks: SocialLink[] = [
  {
    kind: 'github',
    label: 'GitHub profile',
    href: 'https://github.com/Zel-jpeg',
  },
  {
    kind: 'linkedin',
    label: 'LinkedIn profile',
    href: 'https://www.linkedin.com/in/azel-villanueva-b81773446',
  },
  {
    kind: 'email',
    label: 'Email Azel',
    href: `mailto:${contactEmail}`,
  },
];

// Owner-requested stack of their portrait and temporary presentation/pitching photos.
// Replace with personal photos later, following the saved plan in README.md.
export const personalPhotos = [
  {
    src: profilePhoto,
    alt: 'Portrait of Azel Villanueva',
    position: '50% 50%',
  },
  {
    src: pitchingTeamPhoto,
    alt: 'Team photo in front of a Pitch Deck presentation screen',
    position: '70% 72%',
  },
  {
    src: pitchingCandidPhoto,
    alt: 'Group selfie at the presentation and pitching activity',
    position: '50% 50%',
  },
  {
    src: sakyanTeamPhoto,
    alt: 'Team beside the Sakyan prototype presentation booth',
    position: '72% 50%',
  },
];
export const outsideIntro =
  'A little space for life beyond the screen. Personal interests and moments will live here as this portfolio grows.';
export const hobbies: string[] = [];
