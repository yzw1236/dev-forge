import type { Metadata } from 'next';

export interface ToolMetadata {
  title: string;
  description: string;
  keywords: string[];
  structuredData?: any;
}

export const toolMetadata: Record<string, ToolMetadata> = {
  json: {
    title: "JSON Tools - Format, Validate & Beautify JSON",
    description: "Free online JSON formatter, validator, and beautifier. Format JSON data, validate JSON syntax, and make your JSON readable with our powerful JSON tools.",
    keywords: ["JSON formatter", "JSON validator", "JSON beautifier", "JSON prettifier", "JSON tools", "format JSON", "validate JSON"],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "JSON Tools",
      "description": "Format, validate, and beautify JSON data",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  base64: {
    title: "Base64 Encoder/Decoder - Convert Text & Files",
    description: "Free online Base64 encoder and decoder. Convert text, files, and images to Base64 format and decode Base64 strings back to original content.",
    keywords: ["Base64 encoder", "Base64 decoder", "Base64 converter", "encode Base64", "decode Base64", "Base64 tools"],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Base64 Encoder/Decoder",
      "description": "Encode and decode Base64 strings",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  timestamp: {
    title: "Timestamp Converter - Unix Time & Date Tools",
    description: "Convert between Unix timestamps and human-readable dates. Free online timestamp converter with support for various formats and timezones.",
    keywords: ["timestamp converter", "Unix timestamp", "date converter", "time converter", "epoch time", "timestamp tools"],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Timestamp Converter",
      "description": "Convert between timestamps and readable dates",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  crontab: {
    title: "Crontab Tool - Cron Expression Generator & Validator",
    description: "Generate and validate cron expressions. Free online crontab tool to create, test, and understand cron job schedules.",
    keywords: ["crontab tool", "cron expression", "cron generator", "cron validator", "schedule generator", "cron jobs"],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Crontab Tool",
      "description": "Generate and validate cron expressions",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  hash: {
    title: "Hash Calculator - MD5, SHA1, SHA256 & More",
    description: "Calculate hash values for text and files. Free online hash calculator supporting MD5, SHA1, SHA256, SHA512, and other hash algorithms.",
    keywords: ["hash calculator", "MD5", "SHA1", "SHA256", "hash generator", "checksum calculator", "hash tools"],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Hash Calculator",
      "description": "Calculate various hash algorithms",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  jwt: {
    title: "JWT Decoder - Decode & Validate JWT Tokens",
    description: "Decode and validate JWT (JSON Web Tokens). Free online JWT decoder to inspect token payload, headers, and verify signatures.",
    keywords: ["JWT decoder", "JWT token", "JSON Web Token", "JWT validator", "decode JWT", "JWT tools"],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "JWT Decoder",
      "description": "Decode and validate JWT tokens",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  uuid: {
    title: "UUID Generator - Generate Unique Identifiers",
    description: "Generate UUIDs (Universally Unique Identifiers) in various formats. Free online UUID generator for v1, v4, and v5 UUIDs.",
    keywords: ["UUID generator", "unique identifier", "GUID generator", "UUID v4", "UUID v1", "UUID tools"],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "UUID Generator",
      "description": "Generate UUIDs in various formats",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  password: {
    title: "Password Generator - Create Secure Passwords",
    description: "Generate secure, random passwords with customizable options. Free online password generator with length, character type, and strength settings.",
    keywords: ["password generator", "secure password", "random password", "strong password", "password creator", "password tools"],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Password Generator",
      "description": "Generate secure passwords with custom options",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  url: {
    title: "URL Tool - Encode & Decode URLs",
    description: "Encode and decode URLs. Free online URL encoder/decoder to convert special characters and make URLs safe for web use.",
    keywords: ["URL encoder", "URL decoder", "URL encoding", "percent encoding", "URL converter", "URL tools"],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "URL Tool",
      "description": "Encode and decode URLs",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  beautifier: {
    title: "Code Beautifier - Format & Pretty Print Code",
    description: "Beautify and format code in various programming languages. Free online code beautifier supporting JavaScript, JSON, XML, CSS, HTML, and more.",
    keywords: ["code beautifier", "code formatter", "pretty print", "code prettifier", "format code", "beautify code"],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Code Beautifier",
      "description": "Beautify and format code in various languages",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  color: {
    title: "Color Converter - Convert Color Formats",
    description: "Convert between different color formats. Free online color converter supporting HEX, RGB, HSL, CMYK, and other color formats.",
    keywords: ["color converter", "HEX to RGB", "RGB to HEX", "color format", "color picker", "color tools"],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Color Converter",
      "description": "Convert between color formats",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  base: {
    title: "Base Converter - Convert Number Bases",
    description: "Convert numbers between different bases (binary, decimal, hexadecimal, octal). Free online base converter for programmers and developers.",
    keywords: ["base converter", "binary converter", "hexadecimal converter", "decimal converter", "number base", "base conversion"],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Base Converter",
      "description": "Convert between number bases",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  sql: {
    title: "SQL Formatter - Format & Beautify SQL Queries",
    description: "Format and beautify SQL queries. Free online SQL formatter to make your SQL code readable and properly indented.",
    keywords: ["SQL formatter", "SQL beautifier", "SQL prettifier", "format SQL", "SQL tools", "database queries"],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "SQL Formatter",
      "description": "Format and beautify SQL queries",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  image2base64: {
    title: "Image to Base64 - Convert Images to Base64",
    description: "Convert images to Base64 strings. Free online tool to encode images as Base64 for embedding in HTML, CSS, or data URIs.",
    keywords: ["image to Base64", "Base64 image", "image encoder", "data URI", "image converter", "Base64 converter"],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Image to Base64",
      "description": "Convert images to Base64 strings",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  convert: {
    title: "Data Converter - Convert Between Formats",
    description: "Convert data between different formats. Free online data converter supporting various data types and formats for developers.",
    keywords: ["data converter", "format converter", "data transformation", "convert data", "data tools"],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Data Converter",
      "description": "Convert between different data formats",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  "http-status": {
    title: "HTTP Status Lookup - Status Code Reference",
    description: "Look up HTTP status codes and their meanings. Free online HTTP status code reference with detailed explanations and examples.",
    keywords: ["HTTP status codes", "status code lookup", "HTTP response codes", "status code reference", "HTTP tools"],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "HTTP Status Lookup",
      "description": "Look up HTTP status codes and meanings",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  "user-agent": {
    title: "User-Agent Parser - Parse Browser Information",
    description: "Parse and analyze user agent strings. Free online user-agent parser to extract browser, operating system, and device information.",
    keywords: ["user agent parser", "browser detection", "user agent string", "device detection", "browser info", "user agent tools"],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "User-Agent Parser",
      "description": "Parse and analyze user agent strings",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  }
};

export function generateToolMetadata(toolName: string, locale: string): Metadata {
  const tool = toolMetadata[toolName];
  if (!tool) {
    return {
      title: "Tool Not Found",
      description: "The requested tool could not be found."
    };
  }

  const isEnglish = locale === 'en';
  const baseUrl = 'https://dev-forge.vercel.app';

  return {
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords,
    alternates: {
      canonical: `/${locale}/${toolName}`,
      languages: {
        'en': `/en/${toolName}`,
        'zh': `/zh/${toolName}`,
      },
    },
    openGraph: {
      type: 'website',
      locale: isEnglish ? 'en_US' : 'zh_CN',
      url: `${baseUrl}/${locale}/${toolName}`,
      title: tool.title,
      description: tool.description,
      siteName: 'Dev Forge',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: tool.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.title,
      description: tool.description,
      images: ['/og-image.png'],
      creator: '@bbj',
    },
  };
}
