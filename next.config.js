/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [''], // 외부에서 오는 이미지 도메인을 허용하기 위한 설정. 재시작 필요
  },
};

module.exports = nextConfig;
