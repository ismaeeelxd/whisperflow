import { Request } from 'express';
import { User } from 'src/user/types/user.interface';

export interface AuthenticatedRequest extends Request {
  user: User;
}
