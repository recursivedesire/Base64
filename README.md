# Base64 Library

A comprehensive and efficient implementation of the Base64 encoding and decoding techniques. This library seamlessly integrates with the Chaturbate API, providing users with easy-to-use base64 conversion capabilities.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Encoding](#encoding)
  - [Decoding](#decoding)
- [Testing](#testing)
- [Contributing](#contributing)

## Features
- Fast and efficient Base64 encoding.
- Reliable Base64 decoding with error handling.
- Lightweight and minimalistic design.
  
## Installation
To use it directly in the Chaturbate App v2 IDE, just copy the content of a minified javascript release.
If you want to compile it on your own run:

```bash
git clone <repo-url>
npm install
npm run build
```

## Usage

### Encoding

Here's how you can encode data using the Base64 library:

```typescript
import { Base64 } from 'path-to-base64-library';

const data = "Hello, World!";
const encodedData = Base64.encode(data);
console.log(encodedData); // Expected output: "SGVsbG8sIFdvcmxkIQ=="
```

### Decoding

Decode your Base64 encoded data with ease:

```typescript
const decodedData = Base64.decode(encodedData);
console.log(decodedData); // Expected output: "Hello, World!"
```

Note: If you try to decode invalid Base64 data, an error will be thrown, so always make sure to handle potential errors in your code.

## Testing
The Base64 library prides itself on reliability. To test its robustness, use:

```bash
npm run test
```

## Contributing
Your insights and expertise are always appreciated. Whether it's code improvements, suggestions, or any form of collaboration, kindly open an issue or send in a pull request. Thank you for considering contributing to this project.
