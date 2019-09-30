import { UsersController } from './UsersController';
import { UsersService } from './UsersService';

export class UsersModule {
  public usersService = new UsersService();
  public usersController = new UsersController(this.usersService);

  private static instance: UsersModule;
  private constructor() {}

  static getInstance() {
    if (!UsersModule.instance) {
      UsersModule.instance = new UsersModule();
    }

    return UsersModule.instance;
  }
}
