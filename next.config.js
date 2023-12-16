/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        REACT_APP_ALCHEMY_API_KEY : process.env.REACT_APP_ALCHEMY_API_KEY
    }
}

module.exports = nextConfig
