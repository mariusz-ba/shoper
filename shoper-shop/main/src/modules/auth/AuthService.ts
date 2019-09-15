import { UnauthorizedException } from '../../core/exceptions/UnauthorizedException';
import { InternalServerErrorException } from '../../core/exceptions/InternalServerErrorException';
import { CreateUserDto } from './dto/CreateUserDto';
import { AuthCredentialsDto } from './dto/AuthCredentialsDto';
import { AuthRequest } from './interfaces/AuthRequest';
import { SessionInformation } from './interfaces/SessionInformation';
import { UserRepository } from './UserRepository';

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signIn(
    req: AuthRequest,
    authCredentialsDto: AuthCredentialsDto
  ): Promise<SessionInformation> {
    const user = await this.userRepository.validateUserPassword(authCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const sessionInformation = {
      loggedIn: true,
      user: {
        id: user.id,
        email: user.email
      }
    };

    await this.regenerateSession(req, sessionInformation);

    return sessionInformation;
  }

  async signOut(req: AuthRequest) {
    await this.destroySession(req);
  }

  async createUser(
    req: AuthRequest,
    createUserDto: CreateUserDto
  ): Promise<SessionInformation> {
    const user = await this.userRepository.createUser(createUserDto);

    const sessionInformation = {
      loggedIn: true,
      user: {
        id: user.id,
        email: user.email
      }
    };

    await this.regenerateSession(req, sessionInformation);

    return {
      loggedIn: true,
      user: {
        id: user.id,
        email: user.email
      }
    };
  }

  private async regenerateSession(
    req: AuthRequest,
    sessionInformation: SessionInformation
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      // Persist user basket when regenrating session
      const basket = req.session.basket;

      req.session.regenerate(err => {
        if (err) {
          reject(new InternalServerErrorException());
        }

        req.session.user = sessionInformation;
        req.session.basket = basket;

        resolve();
      });
    });
  }

  private async destroySession(req: AuthRequest): Promise<void> {
    return new Promise((resolve, reject) => {
      // Persist user basket when regenrating session
      const basket = req.session.basket;

      req.session.regenerate(err => {
        if (err) {
          reject(new InternalServerErrorException());
        }

        req.session.basket = basket;

        resolve();
      });
    });
  }
}
