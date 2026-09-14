import { useState } from "react";
import { Bot } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ChatWidget } from "./ChatWidget";

export function FloatingContact() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <ChatWidget open={chatOpen} onClose={() => setChatOpen(false)} />

      {!chatOpen && (
        <div className="pointer-events-none fixed bottom-5 right-4 z-40 sm:bottom-6 sm:right-6">
        <div>
          <Button
            type="button"
            size="icon"
            onClick={() => setChatOpen(true)}
            aria-label="Отвори AI чат асистента"
            className="pointer-events-auto h-14 w-14 rounded-full border border-primary/30 bg-primary text-primary-foreground shadow-xl"
          >
            <span className="assistant-bob grid place-items-center">
              <Bot className="h-7 w-7" />
            </span>
          </Button>
        </div>
      </div>
      )}
    </>
  );
}
