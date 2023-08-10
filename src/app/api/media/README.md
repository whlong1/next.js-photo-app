# Notes On AWS S3 Media Uploads

## IAM User
Section is in progress.

## Bucket Policy
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