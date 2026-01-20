import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentDropzoneProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  isProcessing: boolean;
}

export const DocumentDropzone = ({
  onFileSelect,
  selectedFile,
  isProcessing,
}: DocumentDropzoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const removeFile = useCallback(() => {
    onFileSelect(null);
  }, [onFileSelect]);

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!selectedFile ? (
          <motion.label
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "flex flex-col items-center justify-center w-full h-48 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300",
              isDragging
                ? "border-gdigital-green bg-gdigital-green/10 shadow-[0_0_30px_hsl(145_95%_52%/0.2)]"
                : "border-gdigital-green/30 bg-gdigital-navy/40 hover:border-gdigital-green/50 hover:bg-gdigital-navy/60"
            )}
          >
            <div className="flex flex-col items-center justify-center py-6">
              <motion.div
                animate={isDragging ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Upload
                  className={cn(
                    "h-12 w-12 mb-4 transition-colors",
                    isDragging ? "text-gdigital-green" : "text-gdigital-green/50"
                  )}
                />
              </motion.div>
              <p className="text-sm text-white/70 mb-1">
                <span className="font-semibold text-gdigital-green">
                  Haz clic para subir
                </span>{" "}
                o arrastra aquí
              </p>
              <p className="text-xs text-white/40">PDF, DOC, DOCX, PNG, JPG (máx. 10MB)</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              onChange={handleFileInput}
            />
          </motion.label>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full p-6 rounded-xl bg-gdigital-navy/60 border border-gdigital-green/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-gdigital-green/10 border border-gdigital-green/20">
                  <FileText className="h-8 w-8 text-gdigital-green" />
                </div>
                <div>
                  <p className="text-white font-medium truncate max-w-[200px] md:max-w-[300px]">
                    {selectedFile.name}
                  </p>
                  <p className="text-sm text-white/50">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>

              {!isProcessing && (
                <button
                  onClick={removeFile}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="h-5 w-5 text-white/50 hover:text-white" />
                </button>
              )}

              {isProcessing && (
                <div className="flex items-center gap-2 text-gdigital-green">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-gdigital-green/30 border-t-gdigital-green rounded-full"
                  />
                  <span className="text-sm">Procesando...</span>
                </div>
              )}
            </div>

            {isProcessing && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
                className="mt-4 h-1 bg-gradient-to-r from-gdigital-green to-gdigital-lime rounded-full"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
