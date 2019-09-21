import fs from 'fs';
import path from 'path';

export class TranslationsService {
  getTranslations(languageCode: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const translationsFilePath = path.join(__dirname, `../../../translations/shoper_${languageCode}.json`);

      fs.readFile(translationsFilePath, (err, data) => {
        if (err) {
          reject(err);
        }

        if (data) {
          resolve(JSON.parse(data.toString()));
        }

        resolve({});
      });
    });
  }
}
