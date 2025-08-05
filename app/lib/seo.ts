import type { Metadata } from "next";

interface ToolSEOConfig {
  en: {
    title: string;
    description: string;
    keywords: string[];
  };
  zh: {
    title: string;
    description: string;
    keywords: string[];
  };
}

const toolSEOConfigs: Record<string, ToolSEOConfig> = {
  json: {
    en: {
      title: "JSON Formatter & Validator",
      description: "Free online JSON formatter, validator, and beautifier tool. Quickly format, validate, and beautify JSON data with syntax highlighting and error detection.",
      keywords: ["JSON formatter", "JSON validator", "JSON beautifier", "JSON tools", "JSON formatting", "JSON validation", "online JSON tool"]
    },
    zh: {
      title: "JSON 格式化器和验证器",
      description: "免费在线JSON格式化器、验证器和美化工具。快速格式化、验证和美化JSON数据，支持语法高亮和错误检测。",
      keywords: ["JSON格式化器", "JSON验证器", "JSON美化器", "JSON工具", "JSON格式化", "JSON验证", "在线JSON工具"]
    }
  },
  base64: {
    en: {
      title: "Base64 Encoder/Decoder",
      description: "Free online Base64 encoder and decoder tool. Encode text to Base64 and decode Base64 to text with ease.",
      keywords: ["Base64 encoder", "Base64 decoder", "Base64 converter", "Base64 tool", "encode Base64", "decode Base64"]
    },
    zh: {
      title: "Base64 编码器/解码器",
      description: "免费在线Base64编码器和解码器工具。轻松将文本编码为Base64或将Base64解码为文本。",
      keywords: ["Base64编码器", "Base64解码器", "Base64转换器", "Base64工具", "Base64编码", "Base64解码"]
    }
  },
  jwt: {
    en: {
      title: "JWT Decoder",
      description: "Free online JWT decoder tool. Decode and verify JSON Web Tokens with detailed payload information.",
      keywords: ["JWT decoder", "JWT token", "JSON Web Token", "JWT tool", "decode JWT", "JWT payload"]
    },
    zh: {
      title: "JWT 解码器",
      description: "免费在线JWT解码器工具。解码和验证JSON Web Token，提供详细的载荷信息。",
      keywords: ["JWT解码器", "JWT令牌", "JSON Web Token", "JWT工具", "JWT解码", "JWT载荷"]
    }
  },
  hash: {
    en: {
      title: "Hash Calculator",
      description: "Free online hash calculator tool. Generate MD5, SHA1, SHA256, SHA512 hashes for text and files.",
      keywords: ["hash calculator", "MD5", "SHA1", "SHA256", "SHA512", "hash generator", "hash tool"]
    },
    zh: {
      title: "哈希计算器",
      description: "免费在线哈希计算器工具。为文本和文件生成MD5、SHA1、SHA256、SHA512哈希值。",
      keywords: ["哈希计算器", "MD5", "SHA1", "SHA256", "SHA512", "哈希生成器", "哈希工具"]
    }
  },
  uuid: {
    en: {
      title: "UUID Generator",
      description: "Free online UUID generator tool. Generate random UUIDs (Universally Unique Identifiers) for your projects.",
      keywords: ["UUID generator", "UUID tool", "random UUID", "generate UUID", "unique identifier"]
    },
    zh: {
      title: "UUID 生成器",
      description: "免费在线UUID生成器工具。为您的项目生成随机UUID（通用唯一标识符）。",
      keywords: ["UUID生成器", "UUID工具", "随机UUID", "生成UUID", "唯一标识符"]
    }
  },
  password: {
    en: {
      title: "Password Generator",
      description: "Free online password generator tool. Create strong, secure passwords with customizable options.",
      keywords: ["password generator", "strong password", "secure password", "random password", "password tool"]
    },
    zh: {
      title: "密码生成器",
      description: "免费在线密码生成器工具。创建具有可自定义选项的强密码和安全密码。",
      keywords: ["密码生成器", "强密码", "安全密码", "随机密码", "密码工具"]
    }
  },
  timestamp: {
    en: {
      title: "Timestamp Converter",
      description: "Free online timestamp converter tool. Convert between Unix timestamps and human-readable dates.",
      keywords: ["timestamp converter", "Unix timestamp", "date converter", "timestamp tool", "epoch time"]
    },
    zh: {
      title: "时间戳转换器",
      description: "免费在线时间戳转换器工具。在Unix时间戳和人类可读日期之间转换。",
      keywords: ["时间戳转换器", "Unix时间戳", "日期转换器", "时间戳工具", "纪元时间"]
    }
  },
  crontab: {
    en: {
      title: "Crontab Tool",
      description: "Free online crontab tool. Generate, validate, and understand cron expressions for scheduling tasks.",
      keywords: ["crontab tool", "cron expression", "cron generator", "schedule tool", "cron validator"]
    },
    zh: {
      title: "定时任务工具",
      description: "免费在线定时任务工具。生成、验证和理解用于任务调度的cron表达式。",
      keywords: ["定时任务工具", "cron表达式", "cron生成器", "调度工具", "cron验证器"]
    }
  },
  url: {
    en: {
      title: "URL Tool",
      description: "Free online URL encoder and decoder tool. Encode and decode URLs with proper URL encoding.",
      keywords: ["URL encoder", "URL decoder", "URL tool", "URL encoding", "URL decoding", "percent encoding"]
    },
    zh: {
      title: "URL 工具",
      description: "免费在线URL编码器和解码器工具。使用正确的URL编码对URL进行编码和解码。",
      keywords: ["URL编码器", "URL解码器", "URL工具", "URL编码", "URL解码", "百分号编码"]
    }
  },
  beautifier: {
    en: {
      title: "Code Beautifier",
      description: "Free online code beautifier tool. Format and beautify code in various programming languages.",
      keywords: ["code beautifier", "code formatter", "code formatting", "beautify code", "format code"]
    },
    zh: {
      title: "代码美化器",
      description: "免费在线代码美化器工具。格式化和美化各种编程语言的代码。",
      keywords: ["代码美化器", "代码格式化器", "代码格式化", "美化代码", "格式化代码"]
    }
  },
  color: {
    en: {
      title: "Color Converter",
      description: "Free online color converter tool. Convert between HEX, RGB, HSL, and other color formats.",
      keywords: ["color converter", "HEX to RGB", "RGB to HEX", "color tool", "color format", "color picker"]
    },
    zh: {
      title: "颜色转换器",
      description: "免费在线颜色转换器工具。在HEX、RGB、HSL和其他颜色格式之间转换。",
      keywords: ["颜色转换器", "HEX转RGB", "RGB转HEX", "颜色工具", "颜色格式", "颜色选择器"]
    }
  },
  base: {
    en: {
      title: "Base Converter",
      description: "Free online base converter tool. Convert numbers between different number bases (binary, decimal, hexadecimal, octal).",
      keywords: ["base converter", "number converter", "binary converter", "hex converter", "decimal converter"]
    },
    zh: {
      title: "进制转换器",
      description: "免费在线进制转换器工具。在不同数字进制之间转换数字（二进制、十进制、十六进制、八进制）。",
      keywords: ["进制转换器", "数字转换器", "二进制转换器", "十六进制转换器", "十进制转换器"]
    }
  },
  sql: {
    en: {
      title: "SQL Formatter",
      description: "Free online SQL formatter tool. Format and beautify SQL queries with proper indentation and syntax highlighting.",
      keywords: ["SQL formatter", "SQL beautifier", "SQL formatting", "SQL tool", "format SQL", "SQL query"]
    },
    zh: {
      title: "SQL 格式化器",
      description: "免费在线SQL格式化器工具。使用正确的缩进和语法高亮格式化和美化SQL查询。",
      keywords: ["SQL格式化器", "SQL美化器", "SQL格式化", "SQL工具", "格式化SQL", "SQL查询"]
    }
  },
  image2base64: {
    en: {
      title: "Image to Base64",
      description: "Free online image to Base64 converter tool. Convert images to Base64 strings for embedding in web pages.",
      keywords: ["image to Base64", "Base64 image", "image converter", "Base64 converter", "image encoding"]
    },
    zh: {
      title: "图片转Base64",
      description: "免费在线图片转Base64转换器工具。将图片转换为Base64字符串以嵌入网页。",
      keywords: ["图片转Base64", "Base64图片", "图片转换器", "Base64转换器", "图片编码"]
    }
  },
  convert: {
    en: {
      title: "Data Converter",
      description: "Free online data converter tool. Convert between various data formats and units.",
      keywords: ["data converter", "format converter", "unit converter", "data tool", "conversion tool"]
    },
    zh: {
      title: "数据转换器",
      description: "免费在线数据转换器工具。在各种数据格式和单位之间转换。",
      keywords: ["数据转换器", "格式转换器", "单位转换器", "数据工具", "转换工具"]
    }
  },
  "http-status": {
    en: {
      title: "HTTP Status Lookup",
      description: "Free online HTTP status code lookup tool. Find detailed information about HTTP status codes.",
      keywords: ["HTTP status codes", "status code lookup", "HTTP codes", "status lookup", "HTTP tool"]
    },
    zh: {
      title: "HTTP 状态码查询",
      description: "免费在线HTTP状态码查询工具。查找HTTP状态码的详细信息。",
      keywords: ["HTTP状态码", "状态码查询", "HTTP代码", "状态查询", "HTTP工具"]
    }
  },
  "user-agent": {
    en: {
      title: "User-Agent Parser",
      description: "Free online User-Agent parser tool. Parse and analyze User-Agent strings to extract browser and device information.",
      keywords: ["User-Agent parser", "User-Agent tool", "browser detection", "device detection", "UA parser"]
    },
    zh: {
      title: "User-Agent 解析器",
      description: "免费在线User-Agent解析器工具。解析和分析User-Agent字符串以提取浏览器和设备信息。",
      keywords: ["User-Agent解析器", "User-Agent工具", "浏览器检测", "设备检测", "UA解析器"]
    }
  }
};

export function generateToolMetadata(tool: string, locale: string): Metadata {
  const config = toolSEOConfigs[tool];
  if (!config) {
    return {
      title: "Tool Not Found",
      description: "The requested tool could not be found."
    };
  }

  const localeConfig = config[locale as keyof ToolSEOConfig] || config.en;

  return {
    title: localeConfig.title,
    description: localeConfig.description,
    keywords: localeConfig.keywords,
    openGraph: {
      title: localeConfig.title,
      description: localeConfig.description,
      url: `https://dev-forge.vercel.app/${locale}/${tool}`,
      type: 'website',
    },
    twitter: {
      title: localeConfig.title,
      description: localeConfig.description,
    },
    alternates: {
      canonical: `/${locale}/${tool}`,
    },
  };
} 