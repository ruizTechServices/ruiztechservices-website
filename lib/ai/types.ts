export type AIRole = 'system' | 'user' | 'assistant';

export interface AIMessage {
    role: AIRole;
    content: string;
}

export interface AICompletionOptions {
    model?: string;
    temperature?: number;
    maxTokens?: number;
}

export interface AIService {
    generateText(messages: AIMessage[], options?: AICompletionOptions): Promise<string>;
}
