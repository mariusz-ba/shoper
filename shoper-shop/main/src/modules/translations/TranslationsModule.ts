import { TranslationsService } from './TranslationsService';

export class TranslationsModule {
  public readonly translationsService = new TranslationsService();

  private static instance: TranslationsModule;
  private constructor() {}

  static getInstance() {
    if (!TranslationsModule.instance) {
      TranslationsModule.instance = new TranslationsModule();
    }

    return TranslationsModule.instance;
  }
}