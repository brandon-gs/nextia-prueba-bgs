This is the Nextia challenge backend

# Live demo version

You can test this project in the live version [https://www.brandongs.xyz/](https://www.brandongs.xyz/)

## Requirements

You need to have installed:

- Nodejs and npm, pnpm or yarn
- Mongodb in your local machine

[Link to install Nodejs](https://nodejs.org/en/download/)

[Link to download MONGODB](https://www.mongodb.com/try/download/community)

## Getting Started

## Environment variables

Here are the specific variables used in this file and their purpose:

- **PORT**: This variable is used to specify the port on which the backend application will run.

- **FRONTEND_URL**: This variable is used to specify the URL of the frontend application. It is used by the backend to redirect the user after certain actions.

- **MONGODB_URL**: This variable is used to specify the URL of the MongoDB database that the backend will connect to.
- **JWT_ACCESS_SECRET**: This variable is used as a secret key to sign and verify JSON web tokens for access control.

- **SMTP_PROVIDER**: This variable is used to specify the email service provider that will be used to send email.

- **SMTP_EMAIL**: This variable is used to specify the email address that will be used to send email.

- **SMTP_PASSWORD**: This variable is used to specify the password for the email address used to send email.

#### Config STMP variables

To set up a Google account password for use with nodemailer, you'll need to do the following:

1. Go to the Google account security settings by visiting myaccount.google.com/security
2. Scroll down to the "Signing in to Google" section and click on "App passwords"
3. Select "Mail" as the app and "Other (Custom name)" as the device
4. Enter a name for the app password and click "Generate"
5. Google will generate a unique password for you, which you can then use with nodemailer as the password field in the configuration options.

6. Go to the "Security" settings of your Google account.

7. Scroll down to the "Less secure app access" section and turn it on.

After that you need to config the next .env variables with this values

```bash
SMTP_PROVIDER = gmail
SMTP_EMAIL = youremail@gmail.com
SMTP_PASSWORD = your_generated_password_for_this_app
```

## Start the project localy

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

2. Create an .env file, you can use the next command or create it manually (Read the **Environment variables** section to know what values put on them)

```bash
cp .env.sample .env
```

3. Now you can run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Deploy

You can deploy this project using the Dockerfile
