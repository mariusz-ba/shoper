import 'reflect-metadata';
import express, { Application, Request, Response } from 'express';
import expressSession from 'express-session';
import { createConnection } from 'typeorm';
import compression from 'compression';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import path from 'path';
import { config } from './config/config';
import { typeOrmConfig } from './config/typeOrmConfig';
import { HttpError } from './core/exceptions/HttpError';
import { ProductsModule } from './modules/products/ProductsModule';
import { CategoriesModule } from './modules/categories/CategoriesModule';
import { GenericModule } from './modules/generic/GenericModule';
import { BasketModule } from './modules/basket/BasketModule';
import { AuthModule } from './modules/auth/AuthModule';
import { UsersModule } from './modules/users/UsersModule';

export class App {
  private listenning: Boolean = false;
  private static instance: App;
  private readonly app: Application = express();

  private constructor() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(expressSession(config.expressSession));
    this.app.use('/assets', express.static(this.getPublicPath()));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.set('view engine', 'pug');
    this.app.set('views', path.join(__dirname, '../views'));

    if (process.env.NODE_ENV !== 'production') {
      this.app.set('json spaces', 2);
    }

    this.init().then(() => {
      console.log('Connected to database.');
    });
  }

  getPublicPath(subPath: string = '') {
    return path.join(__dirname, '..', 'public/assets', subPath);
  }

  async init(): Promise<void> {
    const connection = await this.initDatabaseConnection();
    await connection.runMigrations();
    this.initControllers();
    this.initErrorHandlingMiddleware();
  }

  initDatabaseConnection() {
    return createConnection(typeOrmConfig);
  }

  initControllers() {
    // Remember to initialize generic module controller at the end
    // because it's binded to '*' route
    [
      AuthModule.getInstance().authController,
      ProductsModule.getInstance().productsController,
      CategoriesModule.getInstance().categoriesController,
      BasketModule.getInstance().basketController,
      UsersModule.getInstance().usersController,
      GenericModule.getInstance().genericController
    ].forEach(controller => {
      this.app.use(controller.path, controller.router);
    });
  }

  initErrorHandlingMiddleware() {
    this.app.use((err: Error, req: Request, res: Response, next: Function) => {
      if (err instanceof HttpError) {
        res.status(err.code).json(err.toJson());
      } else {
        if (process.env.NODE_ENV !== 'production') {
          console.log(err);
        }

        res.status(500).json({ message: 'Something bad happened' });
      }
    });
  }

  static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }

    return App.instance;
  }

  start(port: number) {
    if (this.listenning) {
      throw new Error('Server is already listenning');
    }

    this.listenning = true;
    this.app.listen(port, () => {
      console.log(`Server is listenning on port "${port}"...`);
    });
  }
}
