import { checkBotId } from 'botid/server';
import { checkRateLimit } from '@vercel/firewall';

export class RequestError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function protectPublicChat(request: Request) {
  const verification = await checkBotId({
    developmentOptions: { isDevelopment: false },
    advancedOptions: {
      checkLevel: 'basic',
      headers: Object.fromEntries(request.headers),
    },
  });
  if (!verification.isHuman || verification.isBot || verification.bypassed) {
    throw new RequestError(
      403,
      'The security check could not be completed. Please try again or email me directly.',
    );
  }
  // One Hobby rule, two buckets: client IP and site-wide. Counters live in
  // Vercel, not this disposable instance. Both use the dashboard's rule limit.
  for (const rateLimitKey of [undefined, 'zel-chat-site-wide']) {
    const result = await checkRateLimit('zel-chat', {
      request,
      rateLimitKey,
      timeout: 2000,
    });
    if (result.error)
      throw new RequestError(
        503,
        'Chat protection is temporarily unavailable.',
      );
    if (result.rateLimited)
      throw new RequestError(
        429,
        'Please give me a minute before asking another question.',
      );
  }
}
