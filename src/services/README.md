# Services

This directory is designated for functions that make HTTP requests. These functions are split into two categories: back-end and front-end. Although there might be some redundancy in this design, it provides the advantage of organizing all HTTP requests in one place. This can be particularly beneficial if future refactoring becomes necessary.

## Notes

[Clerk+Next.js Reference App](https://github.com/clerkinc/clerk-next-app-router-starter)
    - Example app sends requests to route handlers from client.
    - In order to access user information in a route handler, requests made from a server component must include Next.js [headers](https://nextjs.org/docs/app/api-reference/functions/headers).

[Notes on Cache prop](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#dynamic-data-fetching)
    - Include  `{ cache: 'no-store' }` in services to avoid unintentional caching.

User information can be accessed within a service function if necessary using Clerk's `auth()` hook.
