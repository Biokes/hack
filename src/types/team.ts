export type TeamMember = {
  id: number;
  name: string;
  position: string;
  bio: string;
  avatar: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
};
