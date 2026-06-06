export const siteConfig = {
  links: {
    telegram: 'https://t.me/ddliqiud',
  },
  api: {
    baseUrl: typeof window !== 'undefined'
      ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5131/api')
      : (process.env.API_URL || 'http://backend:5131/api'),
  },
};
