import { Route } from './Route';
import { User } from './User';

export interface RouteData {
  id: number;
  name: string | null;
  points: Route[];
  user: User;
}
