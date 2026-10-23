import portrait from '../assets/profile-zel.webp';
import sakyan from '../assets/projects/sakyan.webp';
import skillbridge from '../assets/projects/skillbridge.webp';
import verde from '../assets/projects/verde.webp';

export const communityCategories = [
  'All',
  'Hackathons',
  'Speaking',
  'Community events',
] as const;
export type CommunityCategory = (typeof communityCategories)[number];
export type CommunityEntry = {
  id: string;
  title: string;
  category: Exclude<CommunityCategory, 'All'>;
  description: string;
  image: string;
};

// Deliberate sample entries requested by the owner. No attendance, awards,
// organizations, dates, or speaking roles are claimed until details are supplied.
export const communityEntries: CommunityEntry[] = [
  {
    id: 'sample-build',
    title: 'Building together',
    category: 'Hackathons',
    description:
      'A space for future team builds, challenges, and shared ideas.',
    image: sakyan,
  },
  {
    id: 'sample-share',
    title: 'Sharing what I learn',
    category: 'Speaking',
    description:
      'A space for future presentations, demonstrations, and learning sessions.',
    image: skillbridge,
  },
  {
    id: 'sample-connect',
    title: 'Connecting through technology',
    category: 'Community events',
    description:
      'A space for future meetups, school activities, and community moments.',
    image: portrait,
  },
];

export type EventPhoto = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  aspect: string;
};
// Existing profile/project images stand in until the owner supplies event photos.
// Change these source imports and captions to replace the gallery without editing UI.
const sampleSources = [
  portrait,
  sakyan,
  skillbridge,
  portrait,
  verde,
  sakyan,
  portrait,
  verde,
  skillbridge,
  portrait,
  sakyan,
  verde,
];
const aspects = [
  '3 / 4',
  '1 / 1',
  '3 / 5',
  '4 / 5',
  '1 / 1',
  '3 / 4',
  '4 / 5',
  '3 / 5',
  '1 / 1',
  '3 / 4',
  '1 / 1',
  '4 / 5',
];
export const eventPhotos: EventPhoto[] = sampleSources.map((src, index) => ({
  id: `sample-${index + 1}`,
  src,
  alt:
    src === portrait
      ? 'Portrait of Azel Villanueva'
      : src === sakyan
        ? 'Sakyan project interface'
        : src === skillbridge
          ? 'SkillBridge project interface'
          : 'Verde Café Kiosk interface',
  caption:
    src === portrait
      ? 'Azel Villanueva'
      : src === sakyan
        ? 'Sakyan'
        : src === skillbridge
          ? 'SkillBridge'
          : 'Verde Café Kiosk',
  aspect: aspects[index],
}));
