import portrait from '../assets/profile-zel.webp';
import sakyan from '../assets/projects/sakyan.png';
import skillbridge from '../assets/projects/skillbridge.png';
import verde from '../assets/projects/verde.jpg';

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
      'A sample space for future team builds, challenges, and shared ideas.',
    image: sakyan,
  },
  {
    id: 'sample-share',
    title: 'Sharing what I learn',
    category: 'Speaking',
    description:
      'A sample space for future presentations, demonstrations, and learning sessions.',
    image: skillbridge,
  },
  {
    id: 'sample-connect',
    title: 'Connecting through technology',
    category: 'Community events',
    description:
      'A sample space for future meetups, school activities, and community moments.',
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
  alt: `Temporary gallery image ${index + 1}`,
  caption: `Sample image ${String(index + 1).padStart(2, '0')} · Event photos coming soon`,
  aspect: aspects[index],
}));
