// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React strict mode for improved error handling
    reactStrictMode: true,
  
    // Disable server-side rendering for routes that use the AWS SDK
    // This is necessary because the AWS SDK is not compatible with Edge runtimes
    experimental: {
      serverActions: {
        bodySizeLimit: '2mb', // Increase the limit if you're uploading larger files
      },
    },
  
    // Configure webpack
    webpack: (config, { isServer }) => {
      if (!isServer) {
        // Resolve certain Node.js modules that the AWS SDK depends on
        // These are not available in the browser environment
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
          net: false,
          tls: false,
          crypto: false,
          os: false,
          path: false,
          stream: false,
          util: false,
          buffer: false,
          zlib: false,
        };
      }
  
      // Exclude the 'aws-crt' module from being bundled
      // This module causes issues in some environments
      config.externals.push('aws-crt');
  
      return config;
    },
  
    // Configure headers to allow for S3 signed URL requests
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: '*', // Be more specific in production
            },
            {
              key: 'Access-Control-Allow-Methods',
              value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
            },
            {
              key: 'Access-Control-Allow-Headers',
              value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
            },
          ],
        },
      ];
    },
  
    // Increase the timeout for serverless functions if needed
    serverRuntimeConfig: {
      timeoutInSeconds: 60,
    },
  
    // Add environment variables that should be exposed to the browser
    // Be careful not to expose sensitive information
    env: {
      AWS_REGION: process.env.AWS_REGION,
      AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
    },
  };
  
  export default nextConfig;