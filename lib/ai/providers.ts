import { AIService, AIMessage, AICompletionOptions } from './types';
import { mistralChatCompletion } from '@/lib/mistral/inference';
import openai from '@/lib/openai/client';

export class MistralProvider implements AIService {
    async generateText(messages: AIMessage[], options?: AICompletionOptions): Promise<string> {
        // Adapter to match mistralChatCompletion signature
        const mistralMessages = messages.map(m => ({
            role: m.role as 'system' | 'user' | 'assistant' | 'tool', // coerce or map
            content: m.content
        }));

        return mistralChatCompletion({
            messages: mistralMessages,
            model: options?.model
        });
    }
}

export class OpenAIProvider implements AIService {
    async generateText(messages: AIMessage[], options?: AICompletionOptions): Promise<string> {
        const response = await openai.chat.completions.create({
            model: options?.model || 'gpt-4o',
            messages: messages.map(m => ({
                role: m.role,
                content: m.content
            })),
            temperature: options?.temperature,
            max_tokens: options?.maxTokens
        });

        return response.choices[0]?.message?.content || '';
    }
}

export class AIProviderFactory {
    static getProvider(provider: 'mistral' | 'openai'): AIService {
        switch (provider) {
            case 'mistral':
                return new MistralProvider();
            case 'openai':
                return new OpenAIProvider();
            default:
                throw new Error(`Unknown provider: ${provider}`);
        }
    }
}
