import { Router, Request, Response } from 'express';
import { Controller } from '../../core/controllers/ControllerInterface';
import { UsersService } from './UsersService';
import { exceptionsCatcher } from '../../middleware/exceptionsCatcher';
import { UnauthorizedException } from '../../core/exceptions/UnauthorizedException';

const authMiddleware = (req: Request, res: Response, next: Function) => {
  if (req.session && req.session.user) {
    if (req.session.user.user.id === Number(req.params.userId)) {
      return next();
    }
  }

  throw new UnauthorizedException('You are not authorized');
}

export class UsersController implements Controller {
  public readonly path: string = '/api/users';
  public readonly router: Router = Router();

  constructor(private readonly usersService: UsersService) {
    this.router.get('/:userId/address', authMiddleware, exceptionsCatcher(this.getUserAddresses.bind(this)));
  }

  getUserAddresses(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    const addresses = this.usersService.getUserAddresses(userId);

    res.json(addresses);
  }
}
