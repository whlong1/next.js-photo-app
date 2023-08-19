# Services

This directory is designated for functions that make HTTP requests. These functions are split into two categories: back-end and front-end. Although there might be some redundancy in this design, it provides the advantage of organizing all HTTP requests in one place. This can be particularly beneficial if future refactoring becomes necessary.

## Notes

[Clerk+Next.js Reference App](https://github.com/clerkinc/clerk-next-app-router-starter)
    - Example app sends requests to route handlers from client.
    - In order to access user information in a route handler, requests made from a server component must include Next.js [headers](https://nextjs.org/docs/app/api-reference/functions/headers).

[Notes on Cache prop](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#dynamic-data-fetching)
    - Include  `{ cache: 'no-store' }` in services to avoid unintentional caching.

User information can be accessed within a service function if necessary using Clerk's `auth()` hook.




## Next.js Caching

### [On-demand Revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#on-demand-revalidation)

Below you'll find a breakdown of the code necessary for On-demand Revalidation when submitting a new record from a client-side form. This approach should suffice while server actions are still in their experimental phase.

1. **Tag data on Initial Fetch:** 
    - Add a `tag` to the data during the initial `fetch`:
        ```typescript
        const res = await fetch(`${BASE_URL}/api/photos`, {
            next: { tags: ['photos'] }
        });
        ```

2. **Revalidation:** 
    - Revalidation can be triggered within a `Route Handler` using `revalidateTag()`. Say we want to revalidate the `photos` cache once a new record has been submitted. In that scenario, we could call `revalidateTag("photos")` within the `POST` handler function for the photos resource.

3. **Router Refresh for Client-side Handlers:** 
    - If the POST request is called from a client-side component, `router.refresh()` should be invoked within the event handler function to trigger the revalidation.
    
    - [Deep Dive: Caching and Revalidating](https://github.com/vercel/next.js/discussions/54075) by Tim Neutkens.
        > "If you were to fetch() a route handler from the user’s browser, it wouldn’t affect their Router Cache because Next.js wouldn't be aware of the changes. In such scenarios, you must call `router.refresh()`."


### [Opting out of Data Caching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#opting-out-of-data-caching)

You can opt out of caching fetched data using the `{ cache: 'no-store' }` option in a `fetch` request. However, if a database mutation is triggered within a client component, you must still call `router.refresh()` within the associated event handler function.