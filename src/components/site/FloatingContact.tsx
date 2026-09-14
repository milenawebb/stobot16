import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Bot } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ChatWidget } from "./ChatWidget";

export function FloatingContact() {
  const [chatOpen, setChatOpen] = useState(false);
  const reduced = useReducedMotion();

  return (
    <>
      <ChatWidget open={chatOpen} onClose={() => setChatOpen(false)} />

      {!chatOpen && (
        <div className="pointer-events-none fixed bottom-5 right-4 z-40 sm:bottom-6 sm:right-6">
        <motion.div
          animate={reduced ? { y: 0 } : { y: [0, -6, 0] }}
          transition={reduced ? { duration: 0 } : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
        >
          <Button
            type="button"
            size="icon"
            onClick={() => setChatOpen(true)}
            aria-label="Отвори AI чат асистента"
            className="pointer-events-auto h-14 w-14 rounded-full border border-primary/30 bg-primary text-primary-foreground shadow-xl"
          >
            <Bot className="h-7 w-7" />
          </Button>
        </motion.div>
      </div>
      )}
    </>
  );
}
