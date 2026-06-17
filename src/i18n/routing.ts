import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ko', 'en', 'zh', 'vi', 'mn', 'ru'],
  defaultLocale: 'ko',
  localePrefix: 'always',
});
