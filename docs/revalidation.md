# Revalidation

## [Next.js Caching](https://nextjs.org/docs/app/building-your-application/caching#overview)

## [Opting out of Data Caching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#opting-out-of-data-caching)

You can opt out of caching fetched data using the `{ cache: 'no-store' }` option in a `fetch` request. However, if a database mutation is triggered within a client component, you must still call `router.refresh()` within the associated event handler function.

Note, if a `header` is included on a request inside server component, the data will not be cached.

> "Next.js provides helpful functions you may need when fetching data in Server Components such as cookies and headers. These will cause the route to be dynamically rendered as they rely on request time information."

## [Time-based Revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#time-based-revalidation)

The `next.revalidate` option in a `fetch` can be used to set how often data will be revalidated. It appears that updates do not occur until the user triggers some sort of navigation or a refresh.

```typescript
const res = await fetch(`${BASE_URL}/api/photos`, {
    next: { revalidate: 600 }
})
```

> "Any requests that are called within the specified timeframe (e.g. 60-seconds) will return the cached data. After the timeframe, the next request will still return the cached (now stale) data. Next.js will trigger a revalidation of the data in the background."

## [On-demand Revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#on-demand-revalidation)

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

## Questions
1. Is there a way to opt into data caching when using cookies and headers?