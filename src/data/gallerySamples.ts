import type { EventPhoto } from './community';
import forestPreview from '../assets/community/samples/stock-10-preview.webp';
import forest from '../assets/community/samples/stock-10.webp';
import valleyPreview from '../assets/community/samples/stock-11-preview.webp';
import valley from '../assets/community/samples/stock-11.webp';
import beachPreview from '../assets/community/samples/stock-12-preview.webp';
import beach from '../assets/community/samples/stock-12.webp';
import shorePreview from '../assets/community/samples/stock-13-preview.webp';
import shore from '../assets/community/samples/stock-13.webp';
import rocksPreview from '../assets/community/samples/stock-14-preview.webp';
import rocks from '../assets/community/samples/stock-14.webp';
import waterfallPreview from '../assets/community/samples/stock-15-preview.webp';
import waterfall from '../assets/community/samples/stock-15.webp';
import lakePreview from '../assets/community/samples/stock-16-preview.webp';
import lake from '../assets/community/samples/stock-16.webp';
import pathPreview from '../assets/community/samples/stock-17-preview.webp';
import path from '../assets/community/samples/stock-17.webp';
import grassPreview from '../assets/community/samples/stock-18-preview.webp';
import grass from '../assets/community/samples/stock-18.webp';
import mossPreview from '../assets/community/samples/stock-19-preview.webp';
import moss from '../assets/community/samples/stock-19.webp';

// Temporary stock photos requested to fill the remaining ten gallery slots.
// These do not represent the owner's activities. Replace them as photos arrive.
// Photographer/source attribution is recorded in gallerySampleCredits.json.
export const gallerySamples: EventPhoto[] = [
  {
    id: 'stock-forest',
    src: forestPreview,
    fullSrc: forest,
    alt: 'Forest overlooking a blue lake',
    caption: 'Forest & lake',
    aspect: '8 / 11',
    tileAspect: '3 / 4',
    temporary: true,
  },
  {
    id: 'stock-valley',
    src: valleyPreview,
    fullSrc: valley,
    alt: 'River winding through a misty mountain valley',
    caption: 'Mountain valley',
    aspect: '8 / 11',
    tileAspect: '4 / 5',
    temporary: true,
  },
  {
    id: 'stock-beach',
    src: beachPreview,
    fullSrc: beach,
    alt: 'Dark rocks on a quiet sandy beach',
    caption: 'Quiet shoreline',
    aspect: '8 / 11',
    tileAspect: '1 / 1',
    temporary: true,
  },
  {
    id: 'stock-shore',
    src: shorePreview,
    fullSrc: shore,
    alt: 'Pebble shoreline beside a calm lake',
    caption: 'By the water',
    aspect: '8 / 11',
    tileAspect: '3 / 5',
    temporary: true,
  },
  {
    id: 'stock-rocks',
    src: rocksPreview,
    fullSrc: rocks,
    alt: 'Rocky coast beneath a pale sky',
    caption: 'Rocky coast',
    aspect: '8 / 11',
    tileAspect: '3 / 4',
    temporary: true,
  },
  {
    id: 'stock-waterfall',
    src: waterfallPreview,
    fullSrc: waterfall,
    alt: 'Waterfall between rocks and forest',
    caption: 'Waterfall',
    aspect: '8 / 11',
    tileAspect: '4 / 5',
    temporary: true,
  },
  {
    id: 'stock-lake',
    src: lakePreview,
    fullSrc: lake,
    alt: 'Blue lake with distant mountains',
    caption: 'Open water',
    aspect: '8 / 11',
    tileAspect: '2 / 3',
    temporary: true,
  },
  {
    id: 'stock-path',
    src: pathPreview,
    fullSrc: path,
    alt: 'Walking path through a green meadow',
    caption: 'A path through the green',
    aspect: '8 / 11',
    tileAspect: '3 / 4',
    temporary: true,
  },
  {
    id: 'stock-grass',
    src: grassPreview,
    fullSrc: grass,
    alt: 'Sunlit blades of grass in a meadow',
    caption: 'In the meadow',
    aspect: '8 / 11',
    tileAspect: '1 / 1',
    temporary: true,
  },
  {
    id: 'stock-moss',
    src: mossPreview,
    fullSrc: moss,
    alt: 'Golden moss growing on a tree branch',
    caption: 'Small details',
    aspect: '8 / 11',
    tileAspect: '3 / 5',
    temporary: true,
  },
];
