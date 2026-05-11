import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/index.php', destination: '/ko', permanent: true },
      { source: '/pages/intro1.php', destination: '/ko/about/doctor', permanent: true },
      { source: '/pages/intro2.php', destination: '/ko/about/info', permanent: true },
      { source: '/pages/intro3.php', destination: '/ko/about/equipment', permanent: true },
      { source: '/pages/intro5.php', destination: '/ko/about/system', permanent: true },
      { source: '/pages/spec1.php', destination: '/ko/maestro', permanent: true },
      { source: '/pages/icl3.php', destination: '/ko/icl/definition', permanent: true },
      { source: '/pages/icl4.php', destination: '/ko/icl/evo', permanent: true },
      { source: '/pages/icl5.php', destination: '/ko/icl/advantages', permanent: true },
      { source: '/pages/faq.php', destination: '/ko/icl/faq', permanent: true },
      { source: '/pages/myopia1.php', destination: '/ko/myopia', permanent: true },
      { source: '/pages/disease1.php', destination: '/ko/special/post-lasik', permanent: true },
      { source: '/pages/disease2.php', destination: '/ko/special/keratoconus', permanent: true },
      { source: '/pages/disease3.php', destination: '/ko/special/avellino', permanent: true },
      { source: '/pages/disease4.php', destination: '/ko/presbyopia/viva-icl', permanent: true },
      { source: '/pages/cataract.php', destination: '/ko/presbyopia/cataract', permanent: true },
      { source: '/pages/cataract_n.php', destination: '/ko/presbyopia/cataract', permanent: true },
      { source: '/pages/community1.php', destination: '/ko/community/news', permanent: true },
      { source: '/pages/community3.php', destination: '/ko/community/reservation', permanent: true },
      { source: '/pages/community2.php', destination: '/ko/community/reviews', permanent: true },
      { source: '/pages/yutube.php', destination: '/ko/community/youtube', permanent: true },
      { source: '/pages/login.php', destination: '/ko/auth/login', permanent: true },
      { source: '/pages/join.php', destination: '/ko/auth/register', permanent: true },
      { source: '/pages/termsofuse.php', destination: '/ko/legal/terms', permanent: true },
      { source: '/pages/obligations.php', destination: '/ko/legal/privacy', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
