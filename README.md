# Dev Forge

An online toolbox designed for developers, built with React (Next.js), aiming to improve development efficiency and simplify daily development tasks. The project is deployed on a Serverless platform, supporting high availability and elastic scaling.

🌐 **Live Demo**: [https://001236.xyz](https://001236.xyz)

## 🚀 SEO Optimized

This project includes comprehensive SEO optimizations for better search engine visibility and user experience:

### ✅ SEO Features Implemented
- **Dynamic metadata generation** for all tools and pages
- **Structured data (JSON-LD)** for rich search results
- **Open Graph & Twitter Cards** for social media sharing
- **Automatic sitemap generation** (`/sitemap.xml`)
- **Robots.txt** configuration
- **Internationalization SEO** (English & Chinese)
- **Core Web Vitals optimization**
- **PWA support** with web app manifest
- **Security headers** and performance optimizations

### 📊 SEO Benefits
- Better search engine rankings
- Enhanced social media sharing
- Improved mobile experience
- Faster page loading
- Accessibility compliance

📖 **Detailed SEO Guide**: [SEO_OPTIMIZATION.md](./SEO_OPTIMIZATION.md)

## Feature Overview

| Tool                     | Description                                                      |
|--------------------------|------------------------------------------------------------------|
| Timestamp Converter      | Convert between timestamps and dates                              |
| JSON Formatter           | Beautify and validate JSON data                                   |
| SQL Formatter            | Beautify and format SQL statements                                |
| Base64 Encoder/Decoder   | Encode/decode text and Base64                                     |
| URL Encoder/Decoder      | Encode/decode URL text                                            |
| UUID/GUID Generator      | Generate unique identifiers (UUID/GUID)                           |
| Password Generator       | Generate secure passwords with custom rules                       |
| JWT Decoder              | Parse and analyze JWT tokens                                      |
| Hash Calculator          | Calculate hashes (MD5, SHA-1, SHA-256, etc.)                     |
| Color Format Converter   | Convert between HEX, RGB, HSL, HSV, CMYK                          |
| Base Converter           | Convert numbers between binary, octal, decimal, hexadecimal       |
| HTTP Status Lookup       | Search and explain HTTP status codes                              |
| Crontab Generator        | Generate, validate, and explain crontab expressions               |
| Data Structure Converter | Convert between JSON, YAML, XML                                   |
| Image to Base64          | Convert images to Base64 strings                                  |
| User-Agent Parser        | Parse and analyze User-Agent strings                              |
| Code Beautifier          | Format and beautify code for various languages                    |

## Implemented Features

- Timestamp Converter: Convert between timestamps and dates.
- JSON Formatter & Validator: Beautify and validate JSON data for better readability.
- SQL Formatter: Beautify and format SQL statements with intelligent indentation and proper spacing.
- Base64 Encoder/Decoder: Convert between text and Base64 with bidirectional functionality.
- URL Encoder/Decoder: Encode text for URLs or decode URL-encoded text back to readable format.
- UUID/GUID Generator: Generate unique identifiers with support for both UUID and GUID formats.
- Password Generator: Generate secure passwords with customizable length, character types, and strength indicators.
- JWT Decoder: Parse and display JWT contents with token analysis and validation.
- Hash Calculator: Support multiple hash algorithms (MD5, SHA-1, SHA-256, SHA-512, SHA-384, SHA-224).
- Color Format Converter: Convert between RGB, HEX, HSL, HSV, and CMYK color formats.
- Base Converter: Convert numbers between binary, octal, decimal, and hexadecimal bases.
- HTTP Status Code Lookup: Search and understand HTTP status codes with detailed descriptions.
- Crontab Generator/Validator: Generate, validate, and explain Linux crontab expressions with templates.
- Data Structure Converter: Convert between JSON, YAML, and XML formats with auto-detection.
- Image to Base64: Convert image files to Base64 strings with preview and one-click copy.
- User-Agent Parser: Parse and analyze User-Agent strings to extract browser, OS, and device information.
- Code Beautifier: Format and beautify code for various mainstream programming languages.

### 📝 Upcoming Features
- Docker deployment support
- More code beautifier language support
- More data structure format support (e.g., TOML, CSV)
- More developer utilities (suggestions welcome!)

## Usage

### Timestamp Converter
- Enter a date (e.g., `2024-06-01`) or a timestamp (in seconds or milliseconds).
- Click "Convert" to see the result:
  - If you enter a date, you'll get the corresponding timestamp (in milliseconds).
  - If you enter a timestamp, you'll get the corresponding ISO date string.
- Errors are shown if the input is invalid.

### JSON Formatter & Validator
- Paste or type your JSON into the textarea.
- Click "Format & Validate" to beautify the JSON and check for errors.
- If the JSON is valid, it will be formatted and displayed below.
- If invalid, an error message will be shown.

### SQL Formatter
- Paste or type your SQL query into the input textarea.
- Click "Format SQL" to beautify the query with proper indentation and spacing.
- The formatted SQL will be displayed in the output area with improved readability.
- Use the "Copy" button to copy the formatted SQL to your clipboard.

### Base64 Encoder/Decoder
- Switch between Encode and Decode modes using the toggle buttons.
- Enter text to encode to Base64 or paste Base64 string to decode.
- Click the respective button to perform the conversion.
- Use "Copy" to copy the result or "Swap" to move the result to input.

### URL Encoder/Decoder
- Switch between Encode and Decode modes using the toggle buttons.
- Enter text to encode for URLs or paste URL-encoded text to decode.
- Click the respective button to perform the conversion.
- Use "Copy" to copy the result or "Swap" to move the result to input.

### UUID/GUID Generator
- Choose between UUID (lowercase) and GUID (uppercase) formats.
- Set the number of UUIDs to generate (1-100).
- Click "Generate" to create unique identifiers.
- Copy individual UUIDs or all at once using the copy buttons.

### Password Generator
- Adjust password length using the slider (8-64 characters).
- Select character types: uppercase, lowercase, numbers, and symbols.
- Use advanced options to exclude similar or ambiguous characters.
- View password strength indicator and copy the generated password.

### JWT Decoder
- Paste your JWT token in the input field.
- Click "Decode JWT" to view header, payload, and signature.
- View token information including expiration and issuance dates.
- Copy individual sections (header, payload, signature) as needed.

### Hash Calculator
- Enter text to calculate hash values.
- Select from multiple algorithms: MD5, SHA-1, SHA-256, SHA-512, SHA-384, SHA-224.
- Use "Select All" or "Select None" for bulk operations.
- Copy individual hash results with one click.

### Color Format Converter
- Enter color in any format (hex, RGB, HSL) or use the color picker.
- View real-time conversion to all supported formats.
- See color preview and copy any format value.
- Supports HEX, RGB, HSL, HSV, and CMYK formats.

### Base Converter
- Select input base (binary, octal, decimal, hexadecimal).
- Enter number and see real-time conversion to all bases.
- Copy individual base results with one click.
- Includes quick examples for common conversions.

### HTTP Status Code Lookup
- Search status codes by number, message, or description.
- Filter by categories (Informational, Success, Redirection, Client Error, Server Error).
- View detailed information for each status code.
- Click on any status code for comprehensive details.

### Crontab Generator/Validator
- Select a common template or enter a custom crontab expression.
- Click "Validate/Explain" to validate and explain the expression.
- One-click copy and error feedback.

### Data Structure Converter
- Paste JSON, YAML, or XML; format is auto-detected.
- Select output format (JSON/YAML/XML) and click "Convert".
- One-click copy for the result, with error feedback.

### Image to Base64
- Drag & drop or click to upload an image file.
- Preview the image and get the Base64 string instantly.
- One-click copy for the Base64 result.

### User-Agent Parser
- Paste User-Agent string to analyze browser and device information.
- Extract browser, OS, device type, and rendering engine details.
- Detect mobile, tablet, desktop, and bot devices.
- View version information for browsers and operating systems.

### Code Beautifier
- Select a language (JS, TS, JSON, HTML, CSS, Python, Java, C/C++, Go, Shell, etc.).
- Paste or enter code, then click "Format" to beautify.
- One-click copy for the beautified result, with error feedback.

## Tech Stack

- Frontend: Next.js (React + TypeScript)
- Styling: Tailwind CSS
- Deployment: Serverless

## Getting Started

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/dev-forge.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

### Online Access
The application is currently deployed and accessible at: [https://001236.xyz](https://001236.xyz)

### Docker Deployment (Coming Soon)
This project will support Docker deployment for easy containerized deployment:

```bash
# Build the Docker image
docker build -t dev-forge .

# Run the container
docker run -p 3000:3000 dev-forge
```

### Serverless Deployment
This project is designed for Serverless architecture deployment, supporting high availability and elastic scaling. Detailed deployment instructions will be added in future documentation.

## Contribution

Feel free to submit Issues and PRs to help improve the toolbox!

---

> This project is dedicated to providing developers with an all-in-one efficient toolkit and will be continuously updated.
