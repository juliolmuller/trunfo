import { type User } from '~/models';

export interface Player {
  addedAt: Date; // stored as ISO date string

  avatar: string;
  id: string;
  name: string;
  order: number;

  userId?: User['id'];
}
