function getTranslations() {
  if (!window.__TRANSLATIONS__) {
    throw new Error(
      `Property "__TRANSLATIONS__" does not exist on "window" object`
    );
  }

  return window.__TRANSLATIONS__;
}

export const translations = getTranslations();
