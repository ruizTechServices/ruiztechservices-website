'use client';

import * as React from "react";
import { cn } from "@/lib/utils";
import { useEmbeddings } from "@/hooks/use-embeddings";
import { Button } from "@/components/ui/button";

interface InputMainProps extends React.ComponentProps<"input"> {
    onFinalSubmit?: (inputValue: string) => void;
  }
  
  function InputMain({ className, onFinalSubmit, ...props }: InputMainProps) {
    const [inputValue, setInputValue] = React.useState("");
    const { embedding, loading, error, getEmbedding } = useEmbeddings();
  
    const handleSubmit = async () => {
      await getEmbedding(inputValue);
      onFinalSubmit?.(inputValue); // <-- Call parent if needed
    };
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    };

    React.useEffect(() => {
        if (embedding) {
            console.log("🔗 Embedded vector:", embedding);
        }
        if (error) {
            console.error("❌ Error embedding text:", error);
        }
    }, [embedding, error]);

    return (
        <div className="flex gap-2 w-full md:w-1/2 md:mx-auto md:my-2">
            <input
                className={cn(
                    "w-full rounded-md border bg-transparent px-3 py-2 text-sm",
                    "focus:outline-none focus:ring-2 focus:ring-primary",
                    className
                )}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                {...props} />
            <Button onClick={handleSubmit} disabled={loading}>Submit</Button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
}

export { InputMain };
