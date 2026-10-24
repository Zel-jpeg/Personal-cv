// Public chat facts only. Leave unconfirmed details empty; never put private
// contact information, credentials, or a full birth date in this module.
type PublicChatProfile = {
  preferredName: string;
  age: { years: number; asOf: string } | null;
  interests: string[];
  goals: string[];
  introduction: string | null;
};

export const publicChatProfile: PublicChatProfile = {
  preferredName: 'Zel',
  age: null,
  interests: [
    'software development',
    'web development',
    'UI/UX',
    'emerging technologies',
  ],
  goals: [],
  introduction: null,
};
