import { Router, Response } from 'express';
import { Validator } from 'class-validator';
import { exceptionsCatcher } from '../../middleware/exceptionsCatcher';
import { Controller } from '../../core/controllers/ControllerInterface';
import { BadRequestException } from '../../core/exceptions/BadRequestException';
import { UnauthorizedException } from '../../core/exceptions/UnauthorizedException';
import { AuthCredentialsDto } from './dto/AuthCredentialsDto';
import { CreateUserDto } from './dto/CreateUserDto';
import { AuthRequest } from './interfaces/AuthRequest';
import { AuthService } from './AuthService';

const validator = new Validator();

export class AuthController implements Controller {
  public readonly path: string = '/api/auth';
  public readonly router: Router = Router();

  constructor(private readonly authService: AuthService) {
    this.router.post('/signin', exceptionsCatcher(this.signIn.bind(this)));
    this.router.post('/signout', exceptionsCatcher(this.signOut.bind(this)));
    this.router.post('/signup', exceptionsCatcher(this.createUser.bind(this))); 
  }

  async signIn(req: AuthRequest, res: Response) {
    const authCredentialsDto = new AuthCredentialsDto();
    authCredentialsDto.email = req.body.email;
    authCredentialsDto.password = req.body.password;

    const errors = await validator.validate(authCredentialsDto);

    if (errors.length) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const sessionInformation = await this.authService.signIn(req, authCredentialsDto);

    res.json(sessionInformation);
  }

  async signOut(req: AuthRequest, res: Response) {
    await this.authService.signOut(req);

    res.json({ loggedIn: false });
  }

  async createUser(req: AuthRequest, res: Response) {
    const createUserDto = new CreateUserDto();
    createUserDto.email = req.body.email;
    createUserDto.password = req.body.password;
    createUserDto.firstName = req.body.firstName;
    createUserDto.lastName = req.body.lastName;
    createUserDto.gender = req.body.gender;

    const errors = await validator.validate(createUserDto);

    if (errors.length) {
      throw new BadRequestException('Invalid arguments', errors);
    }

    const sessionInformation = await this.authService.createUser(req, createUserDto);

    res.json(sessionInformation);
  }
}
