# Clerk

This guide will outline the use of Clerk with Next.js. Any current issues and planning will be documented here as well.

## Resources

[Get started with Next.js](https://clerk.com/docs/nextjs/get-started-with-nextjs)

[Clerk+Next.js Reference App](https://github.com/clerkinc/clerk-next-app-router-starter)

[Conditional Rendering](https://clerk.com/blog/conditional-rendering-react?utm_source=www.google.com&utm_medium=referral&utm_campaign=none)

## Issues
• On sign in, console initially shows an unauthorized msg
• [Auth data is not present on serverside](https://github.com/clerkinc/javascript/issues/1528)
• [Cookies are missing if a request is sent from the server side to a Route Handler](https://github.com/vercel/next.js/issues/47126)