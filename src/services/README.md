# Services

Functions for for making HTTP requests will be held in this directory. These functions are currently running on the server side. While redundant, this pattern should groups all HTTP requests together and should prove useful if we need to refactor things later on. 

## Resources

1. [Clerk+Next.js Reference App](https://github.com/clerkinc/clerk-next-app-router-starter)
    - Example app sends requests to route handlers from client.
    - In order to access user information in a route handler, requests made from a server component must include Next.js [headers](https://nextjs.org/docs/app/api-reference/functions/headers).

2. [Notes on Cache prop](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#dynamic-data-fetching)
    - Include  `{ cache: 'no-store' }` in services to avoid unintentional caching.

3. User information can be accessed within a service function if necessary using Clerk's `auth()` hook.