import { Request, Response } from 'express';

export const exceptionsCatcher = (func: Function) => {
  return (req: Request, res: Response, next: any) => {
    Promise.resolve(func(req, res)).catch(next);
  };
};
