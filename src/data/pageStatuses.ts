export type PageStatus = 'not-found' | 'offline' | 'error';

export const pageStatuses = {
  'not-found': {
    code: '404',
    title: 'This page wandered off.',
    description:
      "The page you're looking for doesn't exist or may have moved. Let's get you back to the portfolio.",
  },
  offline: {
    code: 'OFFLINE',
    title: 'A little disconnected.',
    description:
      'Your device appears to be offline. Check your connection and try again. Content already loaded may still be available.',
  },
  error: {
    code: 'OOPS',
    title: 'Something went wrong.',
    description:
      'An unexpected error interrupted this page. Try again, or head back home to continue exploring.',
  },
} satisfies Record<
  PageStatus,
  { code: string; title: string; description: string }
>;
