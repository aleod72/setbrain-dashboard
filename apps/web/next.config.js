module.exports = {
    reactStrictMode: true,
    transpilePackages: ['ui'],
    experimental: {
        appDir: true,
        swcMinify: false,
    },
    images: {
        domains: [
            'lh3.googleusercontent.com',
            'lh4.googleusercontent.com',
            'lh5.googleusercontent.com',
            'lh6.googleusercontent.com',
            'res.cloudinary.com',
            'docs.google.com',
            'sheets.google.com',
        ],
    },
};
