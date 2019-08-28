import { Request } from 'express';

export interface BasketRequest extends Request {
  session: Express.Session;
}
