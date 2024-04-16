export enum StringLength {
  VERY_SHORT = 15, // Suitable for abbreviations or codes (e.g., country codes, language codes)
  SHORT = 50, // Good for names, titles, or small descriptors
  MEDIUM = 100, // Ideal for longer names, medium-length descriptions
  EMAIL = 254, // Specifically for email addresses, conforming to RFC 5321
  LONG = 255, // Standard max length for many databases; great for sentences or short paragraphs
  URL = 2048, // URLs, especially those that may have many parameters
  TEXT = 65535, // For longer texts, comments, or posts
  MEDIUMTEXT = 16777215, // For articles, extensive descriptions, or user-generated content with medium length
  LONGTEXT = 4294967295, // Suitable for storing large amounts of text, such as documentation or serialized data
}

export enum NumberLength {
  SMALL = 65535,
  MEDIUM = 16777215,
  INTEGER = 4294967295,
  PRICE = INTEGER,
  PERCENT = 100,
}
