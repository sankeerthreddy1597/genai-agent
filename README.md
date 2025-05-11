# `genai-agent`

`genai-agent` is a TypeScript-based Node.js package that provides an easy interface for interacting with different generative AI providers like Google, OpenAI, and Anthropic. This package allows you to use pre-configured agents for AI-powered tasks such as chat, content generation, and function calls.

## Features

- Supports Google GenAI (Google Cloud).
- Placeholder implementations for OpenAI and Anthropic agents (to be added later).
- Easily extensible to add more AI providers in the future.

## Installation

To install the package, run the following command:

```bash
npm install genai-agent
```

## Usage

Here’s how you can use the package to interact with the available agents (Google for now):

### 1.Google Agent

```ts
import { GoogleAgent } from "genai-agent";

// Initialize the agent with your API key
const agent = new GoogleAgent({ apiKey: "YOUR_GOOGLE_API_KEY" });

// Call the chat method to interact with the AI
const response = await agent.chat({
  model: "your-model-id",
  text: "Hello, AI!",
  functionDeclarations: [],
  functions: {},
  systemInstruction: "your-instruction",
});

console.log(response); // The response from the AI
```

### 2. OpenAI Agent (Coming Soon)

```ts
import { OpenAIAgent } from "genai-agent";

// Placeholder for OpenAIAgent usage
const openAI = new OpenAIAgent({ apiKey: "YOUR_OPENAI_API_KEY" });
```

### 3. Anthropic Agent (Coming Soon)

```ts
import { AnthropicAgent } from "genai-agent";

// Placeholder for AnthropicAgent usage
const anthropic = new AnthropicAgent({ apiKey: "YOUR_ANTHROPIC_API_KEY" });
```

## API Reference

- Google Agent (Current Implementation)
  - constructor({ apiKey: string }): Initialize with your API key.
  - chat({ model: string, text: string, functionDeclarations: any[], functions: Record<string, Function>, systemInstruction: string }): The main method to interact with the agent and get AI responses.

## Development

To contribute or develop locally, follow these steps:

1. Clone the repository

```bash
git clone https://github.com/yourusername/genai-agent.git
```

2. Install dependencies:

```bash
npm install
```

3. Build typescript code

```bash
npm run build
```

4. Run tests (Add tests once you have them setup)

```bash
npm test
```

## License

This project is licensed under the [MIT License](./LICENSE).

---

## Notices and Attributions

This project includes third-party software components:

- [`@google/genai`](https://www.npmjs.com/package/@google/genai) – © Google LLC, licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)

See the [`NOTICE`](./NOTICE) file for additional details.

## Notes

1. OpenAI and Anthropic: These are placeholders right now. You’ll be able to add their logic in the future, and users will be able to interact with them in the same way as GoogleAgent.
2. API Keys: For security reasons, don't hardcode your API keys in the codebase. Use environment variables or secret managers for production applications.
