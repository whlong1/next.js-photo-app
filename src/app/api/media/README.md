# AWS S3 Media Uploads

This is a brief guide on setting up AWS S3 media storage for use in a Next.js App Router application.

## Outline
1. Create Bucket
2. Configure the bucket's public access settings
3. Configure CORS for the bucket
4. Edit the Bucket Policy
5. Create a new IAM User
7. Grant user `AmazonS3FullAccess` (Permissions tab)
8. Give the IAM User programmatic access (Security Credentials tab)

## Block public access (bucket settings)
Do not select the option to `Block all public access`. Select the options as shown below.

> - [x] `Block public access to buckets and objects granted through new access control lists (ACLs)`
> - [x] `Block public access to buckets and objects granted through any access control lists (ACLs)`
> - [x] `Block public access to buckets and objects granted through new public bucket or access point policies`
> - [ ] `Block public and cross-account access to buckets and objects through any public bucket or access point policies`

## IAM User
Section is in progress.

## Bucket Policy
Add the following to your bucket's `Bucket Policy` section found under the Permissions tab.
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::487179020630:user/hunter-next-vod-user"
            },
            "Action": [
                "s3:DeleteObject",
                "s3:GetObject",
                "s3:PutObject",
                "s3:PutObjectAcl",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::hunter-nextjs-video-on-demand/*",
                "arn:aws:s3:::hunter-nextjs-video-on-demand"
            ]
        }
    ]
}
```

## Cross-origin resource sharing
Add the following to your bucket's `Cross-origin resource sharing (CORS)` section found under the Permissions tab.
```
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "HEAD",
            "GET",
            "PUT",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [
            "ETag",
            "x-amz-meta-custom-header"
        ],
        "MaxAgeSeconds": 3000
    }
]
```

## References

• [AWS SDK for JavaScript](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)

• [Guide using Pages Router and AWS SDK v2](https://selectfrom.dev/connecting-aws-s3-buckets-to-next-js-25e903621c70)

• [Out of date example application](https://vercel.com/templates/next.js/aws-s3-image-upload-nextjs)

• [PutObjectCommand()](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-backupstorage/Class/PutObjectCommand/)

• [Discussion on changes to file uploads in Next.js App Router](https://stackoverflow.com/questions/76379368/how-can-i-upload-images-to-an-amazon-s3-bucket-using-next-js-13s-app-router-and)