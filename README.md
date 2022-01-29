# NextTS Integration with Redux Toolkit

This is a template for creating a NextJS application that uses `redux-observable` to manage side effects.

We use `redux-devtools-extension` when running in developer mode to log actions and state changes and we
use `redux-persist` to save state between browser refreshes.

## Tech Stack

- NextTS
- Formik
- Redux Toolkit
- MUI5
- Yup

## How to use

To get the User (CRUD example) page working, [prisma](https://www.prisma.io/) must be initialized by running:

```sh
npx prisma migrate dev --name=init
```

This will create a new [sqlite](https://sqlite.org/about.html) database where the user details will be stored.

You can install [Prisma Studio](https://www.prisma.io/studio) to seed data.

Then start the NextJs app in developer mode by using:

```sh
npm run dev
```