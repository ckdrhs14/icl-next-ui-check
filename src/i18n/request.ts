import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { hasLocale } from 'next-intl';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const common = (await import(`../../messages/${locale}/common.json`)).default;
  const auth = (await import(`../../messages/${locale}/auth.json`)).default;
  const community = (await import(`../../messages/${locale}/community.json`)).default;
  const legal = (await import(`../../messages/${locale}/legal.json`)).default;
  const about = (await import(`../../messages/${locale}/about.json`)).default;
  const icl = (await import(`../../messages/${locale}/icl.json`)).default;
  const maestro = (await import(`../../messages/${locale}/maestro.json`)).default;
  const myopia = (await import(`../../messages/${locale}/myopia.json`)).default;
  const special = (await import(`../../messages/${locale}/special.json`)).default;
  const presbyopia = (await import(`../../messages/${locale}/presbyopia.json`)).default;

  return {
    locale,
    messages: {
      ...common,
      auth,
      community,
      legal,
      about,
      icl,
      maestro,
      special,
      presbyopia,
      myopia,
    },
  };
});
