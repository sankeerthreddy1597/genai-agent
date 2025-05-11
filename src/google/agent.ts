import { GoogleGenAI, FunctionDeclaration, ContentListUnion } from "@google/genai";

export interface AgentOptions {
  apiKey: string;
  logger?: Console;
}

export interface ChatOptions {
  model?: string;
  text: string;
  functionDeclarations?: FunctionDeclaration[];
  functions?: Record<string, (...args: any[]) => Promise<any>>;
  systemInstruction?: string;
  maxIterations?: number;
}

class GoogleAgent {
  private client: GoogleGenAI;
  private logger: Console;

  constructor({ apiKey, logger = console }: AgentOptions) {
    if (!apiKey) throw new Error("API key is required.");
    this.client = new GoogleGenAI({ apiKey });
    this.logger = logger;
  }

  async chat({
    model = "gemini-2.0-flash",
    text,
    functionDeclarations = [],
    functions = {},
    systemInstruction = "",
    maxIterations = 5,
  }: ChatOptions): Promise<string> {
    if (!text || typeof text !== "string") {
      throw new Error("Input 'text' must be a non-empty string.");
    }

    const contents: ContentListUnion = [
      {
        role: "user",
        parts: [{ text }],
      },
    ];

    for (let i = 0; i < maxIterations; i++) {
      const response = await this.client.models.generateContent({
        model,
        contents,
        config: {
          ...(functionDeclarations.length && {tools: [{ functionDeclarations }]} ),
          systemInstruction,
        },
      });

      const functionCalls = response?.functionCalls || [];
      if (functionCalls.length > 0) {
        const call = functionCalls[0];

        
        const func = functions[call.name as keyof typeof functions];

        if (!func) {
          throw new Error(`Function "${call.name}" not found.`);
        }

        const args = Object.values(call.args ?? {});
        const result = await func(...args);

        contents.push({ role: "model", parts: [{ functionCall: call }] });
        contents.push({
          role: "user",
          parts: [
            {
              functionResponse: {
                name: call.name,
                response: result,
              },
            },
          ],
        });

        this.logger.log(`Called function: ${call.name}`, result);
      } else {
        return response.text || "No response text.";
      }
    }

    return "Max iterations reached without resolution.";
  }
}

export default GoogleAgent;
