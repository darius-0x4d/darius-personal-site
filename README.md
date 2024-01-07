[![Clone my site and Deploy it with Vercel!](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/darius-0x4d/darius-personal-site)

# dariusmcfarland.com

## What do I use?

- **Framework**: [Next.js](https://nextjs.org/)
- **CMS**: [Sanity CMS](https://www.sanity.io/)
- **Database**: [PlanetScale](https://planetscale.com)
- **Authentication**: [NextAuth.js](https://next-auth.js.org)
- **Deployment**: [Vercel](https://vercel.com)
- **Styling**: [Tailwind](https://tailwindcss.com) & [shadcn/ui](https://ui.shadcn.com/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

## Running Locally

This application requires Node.js v18.17+.

```bash
git clone https://github.com/darius-0x4d/darius-personal-site.git
cd darius-personal-site
pnpm install
pnpm run setup # Remove all of my personal information
pnpm dev
```

Create a `.env` file similar to [`.env.example`](https://github.com/darius-0x4d/darius-personal-site/blob/main/.env.example).

## Cloning / Forking

Please review the [license](https://github.com/darius-0x4d/darius-personal-site/blob/main/LICENSE.txt) and remove all of my personal information (blog posts, images, etc.) by running `pnpm run setup`.
