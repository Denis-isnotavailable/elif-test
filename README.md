This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Tech Stack

- Framework: Next.js (App Router)
- Styling: Tailwind CSS
- Database: PostgreSQL (via Prisma ORM)
- State Management: Native localStorage
- Language: TypeScript

## Key Features

- Shops and Products: View a list of shops and their product assortments
- Filtering and Sorting: Dynamic filtering by category and shop rating
- Infinite Scroll: Automatic product loading during scrolling
- Shopping Cart: Local data persistence with instant UI updates via the storage event
- Order History: Order search functionality based on email

## Getting Started

Install dependencies

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Generate Prisma Client and push schema

```bash
npx prisma generate
npx prisma db push
```

## Project Structure

- src/app/ — Pages and API routes (App Router)
- src/\_components/ — Reusable UI components
- src/ — State management logic (cart)
- src/utils/ — Utilities for localStorage and API interactions
- prisma/ — Database schema (schema.prisma)

## Development

If you add new fields to schema.prisma, always run npx prisma db push to synchronize the database.
Strictly follow TypeScript typing — avoid using any.
