import 'reflect-metadata';
import express, { Application, Request, Response } from 'express';
import { createConnection } from 'typeorm';
import compression from 'compression';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import path from 'path';
import { typeOrmConfig } from './config/typeOrmConfig';
import { HttpError } from './core/exceptions/HttpError';
import { ProductsModule } from './modules/products/ProductsModule';

export class App {
  private listenning: Boolean = false;
  private static instance: App;
  private readonly app: Application = express();

  private constructor() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use('/assets', express.static(this.getPublicPath()));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.set('json spaces', 2);

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
    // Init rest api controllers
    [ProductsModule.getInstance().productsController].forEach(controller => {
      this.app.use(controller.path, controller.router);
    });

    // Init route for frontend application
    this.app.get('*', (req: Request, res: Response) => {
      res.sendFile(this.getPublicPath('base/index.html'));
    });
  }

  initErrorHandlingMiddleware() {
    this.app.use((err: Error, req: Request, res: Response, next: Function) => {
      if (err instanceof HttpError) {
        res.status(err.code).json(err.toJson());
      } else {
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
