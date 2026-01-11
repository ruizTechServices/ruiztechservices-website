'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const codeString = String(children).replace(/\n$/, '');

            if (!inline && match) {
              return (
                <div className="relative group my-4 rounded-md overflow-hidden border bg-[#1e1e1e]">
                  <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-[#3e3e3e]">
                    <span className="text-xs font-mono text-gray-400">{language}</span>
                    <CopyButton text={codeString} />
                  </div>
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={language}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      padding: '1rem',
                      background: 'transparent',
                    }}
                    {...props}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                </div>
              );
            }

            return (
              <code className={cn("bg-muted px-1.5 py-0.5 rounded font-mono text-sm", className)} {...props}>
                {children}
              </code>
            );
          },
          // Custom styling for other elements
          ul: ({ children }: any) => <ul className="list-disc pl-4 my-2 space-y-1">{children}</ul>,
          ol: ({ children }: any) => <ol className="list-decimal pl-4 my-2 space-y-1">{children}</ol>,
          li: ({ children }: any) => <li className="my-0.5">{children}</li>,
          p: ({ children }: any) => <p className="leading-7 my-2">{children}</p>,
          a: ({ href, children }: any) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
              {children}
            </a>
          ),
          h1: ({ children }: any) => <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>,
          h2: ({ children }: any) => <h2 className="text-xl font-bold mt-5 mb-3">{children}</h2>,
          h3: ({ children }: any) => <h3 className="text-lg font-bold mt-4 mb-2">{children}</h3>,
          blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-primary/50 pl-4 italic text-muted-foreground my-4">
              {children}
            </blockquote>
          ),
          table: ({ children }: any) => (
            <div className="overflow-x-auto my-4">
                <table className="min-w-full divide-y divide-border border">{children}</table>
            </div>
          ),
          th: ({ children }: any) => <th className="px-3 py-2 bg-muted text-left text-sm font-semibold">{children}</th>,
          td: ({ children }: any) => <td className="px-3 py-2 text-sm border-t">{children}</td>,
          strong: ({ children }: any) => <strong className="font-semibold">{children}</strong>,
          em: ({ children }: any) => <em className="italic">{children}</em>,
          hr: () => <hr className="my-4 border-border" />,
          img: ({ src, alt }: any) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt} className="rounded-md max-w-full h-auto my-4" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-6 w-6 text-gray-400 hover:text-white"
      onClick={handleCopy}
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      <span className="sr-only">Copy code</span>
    </Button>
  );
};
