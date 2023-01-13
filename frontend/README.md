This is the Nextia challenge frontend

# Live demo version

You can test this project in the live version [https://www.brandongs.xyz/](https://www.brandongs.xyz/)

## Requirements

You need to have installed Nodejs and NPM.

[Link to install Nodejs](https://nodejs.org/en/download/)

## Getting Started

1. First, install the dependencies, I recommend use the pnpm package manager

```bash
# Using PNPM
npm i -g pnpm # Install pnpm
pnpm install
# Using yarn
npm i -g pnpm
yarn
# Using npm
npm i --force
```

2. Create an .env file, you can use the next command or create it manually

```bash
cp .env.sample .env
```

3. Sets up your env variables

```bash
NEXT_PUBLIC_API_URL = http://localhost:5000 # Backend api url
```

4. Now you can run the development server (you need to ensure that the api is also running)

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Steps to deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details or follow the next steps.

1. Install vercel-cli

```bash
npm i -g vercel
#or
pnpm i -g vercel
#or
yarn global add vercel
```

2. For a new project the first deploy will ask to link your local directory to the Vercel Project. This is done by running the vercel command in your local project directory. After run the next command just follow the CLI instructions.

```bash
vercel
```

3. To create a Production Deployment, use the next command.

```bash
vercel --prod
```
