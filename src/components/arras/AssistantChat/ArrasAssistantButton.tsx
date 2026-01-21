import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface ArrasAssistantButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const ArrasAssistantButton = ({ isOpen, onClick }: ArrasAssistantButtonProps) => {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Button
        onClick={onClick}
        size="lg"
        className={`h-14 w-14 rounded-full shadow-2xl transition-all duration-300 ${
          isOpen
            ? "bg-destructive hover:bg-destructive/90"
            : "bg-gradient-to-br from-primary to-accent hover:shadow-primary/40"
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
      
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-16 top-1/2 -translate-y-1/2 bg-background border rounded-lg px-3 py-1.5 shadow-lg whitespace-nowrap"
        >
          <p className="text-sm font-medium">Asistente de Soporte</p>
        </motion.div>
      )}
    </motion.div>
  );
};
