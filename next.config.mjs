/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    'browser-image-compression',
    'pdf-lib',
    'pdfjs-dist',
    'docx',
    'mammoth',
    'qpdf-wasm',
    'pdf-lib-with-encrypt',
    'xlsx',
    'pptxgenjs',
    'jszip',
    'tesseract.js'
  ],
  async redirects() {
    return [
      {
        source: '/pdf-tools/password-generator',
        destination: '/pdf-tools/pdf-password-generator',
        permanent: true,
      },
      {
        source: '/pdf-tools/pdf-password',
        destination: '/pdf-tools/pdf-unlock',
        permanent: true,
      },
      {
        source: '/pdf-tools/unlock-pdf',
        destination: '/pdf-tools/pdf-unlock',
        permanent: true,
      },
      {
        source: '/pdf-tools/pdf-question-answering',
        destination: '/pdf-tools/pdf-qa',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;