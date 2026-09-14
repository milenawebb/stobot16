import { useEffect, useRef, useState } from "react";
import { AssistantMark } from "./AssistantMark";

import { Button } from "@/components/ui/button";
import { ChatWidget } from "./ChatWidget";

export function FloatingContact() {
  const [chatOpen, setChatOpen] = useState(false);
  const bobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = bobRef.current;
    if (!element) return;

    const animation = element.animate(
      [
        { transform: "translate3d(0, 0, 0)" },
        { transform: "translate3d(0, -8px, 0)" },
        { transform: "translate3d(0, 0, 0)" },
      ],
      {
        duration: 2400,
        iterations: Infinity,
        easing: "ease-in-out",
      },
    );

    return () => animation.cancel();
  }, [chatOpen]);

  return (
    <>
      <ChatWidget open={chatOpen} onClose={() => setChatOpen(false)} />

      {!chatOpen && (
        <div className="pointer-events-none fixed bottom-5 right-4 z-40 sm:bottom-6 sm:right-6">
        <div ref={bobRef} data-assistant-bob>
          <Button
            type="button"
            size="icon"
            onClick={() => setChatOpen(true)}
            aria-label="Отвори AI чат асистента"
            className="pointer-events-auto h-14 w-14 rounded-full border border-primary/30 bg-primary text-primary-foreground shadow-xl"
          >
            <span className="grid place-items-center">
              <AssistantMark className="!size-8" />
            </span>
          </Button>
        </div>
      </div>
      )}
    </>
  );
}
