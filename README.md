This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/links](http://localhost:3000/api/links). This endpoint can be edited in `pages/api/links.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Architecture

- The app is based on NextJS framework
- API endpoints are served with the NextJS framework as well
- Material UI is used for styling the app
- MongoDB is used as a DB (Mongoose can be added, if a project grows)

## Folders structure

- components - contains all UI components and hooks
- components/api - contains FE functions to request API endpoints
- database - contains DB configuration (mongodb)
- models - type definitions of main project models
- pages - contains pages
- pages/api - contains endpoints
- services - contains files that query DB (CRUD operations)
- styles folder contains main styles and material design settings


## Deploy on Vercel

The app is deployed by [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
