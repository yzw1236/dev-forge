# Dev Forge

An online toolbox designed for developers, built with React (Next.js), aiming to improve development efficiency and simplify daily development tasks. The project is deployed on a Serverless platform, supporting high availability and elastic scaling.

🌐 **Live Demo**: [https://001236.xyz](https://001236.xyz)

## Feature List

### ✅ Implemented Features

- Timestamp Converter: Convert between timestamps and dates.
- JSON Formatter & Validator: Beautify and validate JSON data for better readability.

### 📝 Upcoming Features

- SQL Formatter: Beautify and format SQL statements.
- Code Beautifier: Support code formatting for various mainstream programming languages.
- Crontab Expression Generator/Validator: Generate and validate cron expressions.
- Base64 Encode/Decode: Convert between text and Base64.
- URL Encode/Decode: Encode and decode URLs.
- JWT (JSON Web Token) Decoder: Parse and display JWT contents.
- Hash Calculator: Support multiple hash algorithms (e.g., MD5, SHA1, SHA256, etc.).
- Color Format Converter: Convert between RGB, HEX, HSL, and other color formats.
- Base Converter: Support conversions between binary, octal, decimal, hexadecimal, etc.
- Data Structure Converter: Convert between formats such as JSON, YAML, XML, etc.
- Image to Base64: Convert image files to Base64 strings.
- UUID/GUID Generator: Quickly generate unique identifiers.
- Password Generator: Generate secure passwords with custom rules.
- HTTP Status Code Lookup: Query common HTTP status codes and their meanings.
- User-Agent Parser: Parse and display detailed information about User-Agent strings.

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
