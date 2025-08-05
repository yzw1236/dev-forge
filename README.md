# Dev Forge - Developer Tools

A comprehensive collection of free online developer tools designed to boost your productivity. Built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **JSON Formatter & Validator** - Format and validate JSON data with syntax highlighting
- **Base64 Encoder/Decoder** - Encode text to Base64 and decode Base64 strings
- **JWT Decoder** - Decode and verify JSON Web Tokens with detailed payload information
- **Hash Calculator** - Generate MD5, SHA1, SHA256, SHA512 hashes
- **UUID Generator** - Generate random UUIDs for your projects
- **Password Generator** - Create strong, secure passwords with customizable options
- **Timestamp Converter** - Convert between Unix timestamps and human-readable dates
- **Crontab Tool** - Generate, validate, and understand cron expressions
- **URL Tool** - Encode and decode URLs with proper URL encoding
- **Code Beautifier** - Format and beautify code in various programming languages
- **Color Converter** - Convert between HEX, RGB, HSL, and other color formats
- **Base Converter** - Convert numbers between different number bases
- **SQL Formatter** - Format and beautify SQL queries with proper indentation
- **Image to Base64** - Convert images to Base64 strings for web embedding
- **Data Converter** - Convert between various data formats and units
- **HTTP Status Lookup** - Find detailed information about HTTP status codes
- **User-Agent Parser** - Parse and analyze User-Agent strings

## 🌐 SEO Optimized

This application is fully optimized for search engines with:

- **Comprehensive Meta Tags** - Proper titles, descriptions, and keywords for all pages
- **Open Graph Tags** - Rich social media previews
- **Twitter Cards** - Optimized Twitter sharing
- **Structured Data** - JSON-LD schema markup for better search understanding
- **Sitemap Generation** - Automatic XML sitemap for search engine indexing
- **Robots.txt** - Proper crawling instructions
- **Canonical URLs** - Prevent duplicate content issues
- **Multilingual Support** - SEO optimized for both English and Chinese
- **Performance Optimized** - Fast loading times for better search rankings

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl
- **Deployment**: Vercel
- **SEO**: Next.js Metadata API

## 📱 PWA Ready

- Web App Manifest
- Service Worker ready
- Offline capability
- Installable on mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yzw1236/dev-forge.git
cd dev-forge
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🌍 Internationalization

The application supports multiple languages:
- English (en)
- Chinese (zh)

Language switching is available in the navigation.

## 🔧 Development

### Project Structure

```
dev-forge/
├── app/
│   ├── [locale]/          # Localized pages
│   │   ├── json/          # JSON formatter tool
│   │   ├── base64/        # Base64 encoder/decoder
│   │   ├── jwt/           # JWT decoder
│   │   └── ...            # Other tools
│   ├── components/        # Reusable components
│   ├── lib/              # Utility functions
│   └── layout.tsx        # Root layout
├── messages/             # Translation files
├── public/              # Static assets
└── scripts/             # Build scripts
```

### Adding New Tools

1. Create a new directory in `app/[locale]/`
2. Add the tool page with proper SEO metadata
3. Update the navigation in the home page
4. Add translations to `messages/en.json` and `messages/zh.json`
5. Update the sitemap configuration

## 📊 SEO Features

### Meta Tags
- Dynamic titles and descriptions
- Proper keywords for each tool
- Open Graph and Twitter Card support
- Canonical URLs to prevent duplicate content

### Structured Data
- JSON-LD schema markup
- WebApplication schema for better search understanding
- Proper author and publisher information

### Performance
- Server-side rendering for better SEO
- Optimized images and assets
- Fast loading times
- Mobile-friendly responsive design

### Search Engine Optimization
- XML sitemap generation
- Robots.txt configuration
- Proper heading hierarchy
- Semantic HTML structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Dev Forge** - Your ultimate developer toolkit for better productivity! 🚀
