import { getCustomRepository } from 'typeorm';
import { AuthService } from './AuthService';
import { AuthController } from './AuthController';
import { UserRepository } from './UserRepository';

export class AuthModule {
  public readonly userRepository = getCustomRepository(UserRepository);
  public readonly authService = new AuthService(this.userRepository);
  public readonly authController = new AuthController(this.authService);

  private static instance: AuthModule;
  private constructor() {}

  static getInstance() {
    if (!AuthModule.instance) {
      AuthModule.instance = new AuthModule();
    }

    return AuthModule.instance;
  }
}
