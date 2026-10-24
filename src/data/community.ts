import pitchingTeamPreview from '../assets/community/pitching-team-01-preview.webp';
import pitchingTeam from '../assets/community/pitching-team-01.webp';
import pitchingTeamSecondPreview from '../assets/community/pitching-team-02-preview.webp';
import pitchingTeamSecond from '../assets/community/pitching-team-02.webp';
import pitchingBehindScenesPreview from '../assets/community/pitching-behind-scenes-preview.webp';
import pitchingBehindScenes from '../assets/community/pitching-behind-scenes.webp';
import sakyanBoothPreview from '../assets/community/sakyan-prototype-booth-preview.webp';
import sakyanBooth from '../assets/community/sakyan-prototype-booth.webp';
import sakyanTeamPreview from '../assets/community/sakyan-prototype-team-preview.webp';
import sakyanTeam from '../assets/community/sakyan-prototype-team.webp';

export const communityCategories = [
  'All',
  'Presentations & pitching',
  'Prototype demos',
] as const;
export type CommunityCategory = (typeof communityCategories)[number];
export type CommunityEntry = {
  id: string;
  title: string;
  category: Exclude<CommunityCategory, 'All'>;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
};

// Titles describe the activities confirmed by the owner. Dates, event names,
// awards, and other participants' identities have not been supplied.
export const communityEntries: CommunityEntry[] = [
  {
    id: 'presentation-pitching',
    title: 'Presentation & pitching',
    category: 'Presentations & pitching',
    description:
      'Presenting ideas and sharing the pitching experience with the team.',
    image: pitchingTeamPreview,
    imageAlt: 'Team members in front of a Pitch Deck presentation screen',
    imagePosition: '70% 72%',
  },
  {
    id: 'sakyan-prototype',
    title: 'Sakyan prototype presentation',
    category: 'Prototype demos',
    description:
      'Presenting and pitching the Sakyan website and mobile app prototype, with a booth showcasing the project.',
    image: sakyanBoothPreview,
    imageAlt: 'Sakyan prototype booth with website and mobile app displays',
  },
];

export type EventPhoto = {
  id: string;
  src: string;
  fullSrc: string;
  alt: string;
  caption: string;
  aspect: string;
  tileAspect?: string;
  position?: string;
  temporary?: boolean;
};

// Five unique owner-supplied photos; the second and third uploaded files were
// identical. Previews load in galleries; larger WebP copies load on opening.
export const eventPhotos: EventPhoto[] = [
  {
    id: 'pitching-team-01',
    src: pitchingTeamPreview,
    fullSrc: pitchingTeam,
    alt: 'Team members posing in front of a Pitch Deck presentation screen',
    caption: 'Presentation & pitching',
    aspect: '3 / 4',
    position: '70% 72%',
  },
  {
    id: 'sakyan-prototype-booth',
    src: sakyanBoothPreview,
    fullSrc: sakyanBooth,
    alt: 'Sakyan booth showing the website, mobile app, and project banner',
    caption: 'Sakyan website & mobile app prototype',
    aspect: '16 / 9',
    tileAspect: '1 / 1',
    position: '76% 50%',
  },
  {
    id: 'pitching-behind-scenes',
    src: pitchingBehindScenesPreview,
    fullSrc: pitchingBehindScenes,
    alt: 'Group selfie at the presentation and pitching activity',
    caption: 'Moments with the team',
    aspect: '3 / 4',
    tileAspect: '3 / 5',
  },
  {
    id: 'sakyan-prototype-team',
    src: sakyanTeamPreview,
    fullSrc: sakyanTeam,
    alt: 'Group photo beside the Sakyan prototype presentation booth',
    caption: 'Sakyan prototype presentation',
    aspect: '16 / 9',
    tileAspect: '4 / 5',
    position: '72% 50%',
  },
  {
    id: 'pitching-team-02',
    src: pitchingTeamSecondPreview,
    fullSrc: pitchingTeamSecond,
    alt: 'Another team photo in front of the Pitch Deck presentation screen',
    caption: 'Presentation & pitching',
    aspect: '3 / 4',
    tileAspect: '2 / 3',
    position: '70% 72%',
  },
];
