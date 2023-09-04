// https://nextjs.org/docs/pages/api-reference/components/image#domains

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [`${process.env.BUCKET_NAME}.s3.us-east-1.amazonaws.com`],
  },
}

module.exports = nextConfig