[![Clone my site and Deploy it with Vercel!](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/darius-0x4d/darius-personal-site)

# dariusmcfarland.com

## What do I use?

- **Framework**: [Next.js](https://nextjs.org/)
- **CMS**: [Sanity CMS](https://www.sanity.io/)
- **Database**: [PlanetScale](https://planetscale.com) with [Prisma](https://www.prisma.io/)
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

Please review the [license](https://github.com/darius-0x4d/darius-personal-site/blob/main/LICENSE.txt) and remove all of my personal information by running `pnpm run setup`.

## Acknowledgements

Huge thanks to [Lee Robinson](https://leerob.io/) for making his personal website available as a [template](https://github.com/leerob/leerob.io) for others to use. Creating this website would've been a lot harder without his template as a starting point for me.
