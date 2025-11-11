"use client";

import { ReactNode, RefObject, useEffect, useRef } from "react";
import { ChevronUp, Loader } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type PopoverFormProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openChild?: ReactNode;
  successChild?: ReactNode;
  showSuccess: boolean;
  width?: string;
  height?: string;
  showCloseButton?: boolean;
  title: string;
};

export function PopoverForm({
  open,
  setOpen,
  openChild,
  showSuccess,
  successChild,
  
  height = "192px",
  title = "Feedback",
  showCloseButton = false,
}: PopoverFormProps) {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  return (
    <div className="relative flex w-full items-center rounded-2xl justify-center min-h-[200px] sm:min-h-[300px]">
      {/* Trigger button */}
      <motion.button
        layoutId={`${title}-wrapper`}
        onClick={() => setOpen(true)}
        style={{ borderRadius: 8 }}
        className="flex h-9 items-center border bg-white dark:bg-[#121212] px-3 text-sm font-medium outline-none"
      >
        <motion.span layoutId={`${title}-title`}>{title}</motion.span>
      </motion.button>

      {/* Popover Container */}
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId={`${title}-wrapper`}
            ref={ref}
            className="absolute p-1  rounded-md  overflow-hidden bg-muted shadow-[0_0_0_1px_rgba(0,0,0,0.08),0px_1px_2px_rgba(0,0,0,0.04)] outline-none
                       w-[90vw] max-w-[420px] min-w-[300px]
                       h-auto min-h-[220px] sm:h-[var(--popover-height,250px)] "
            style={
              {
                "--popover-height": height,
              } as React.CSSProperties
            }
          >
            <motion.span
              aria-hidden
              className="absolute left-4 top-[17px] text-sm rounded-2xl text-muted-foreground data-[success]:text-transparent"
              layoutId={`${title}-title`}
              data-success={showSuccess}
            >
              {title}
            </motion.span>

            {showCloseButton && (
              <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                <button
                  onClick={() => setOpen(false)}
                  className="absolute z-10 -mt-1 flex items-center justify-center w-[10px] h-[6px] rounded-full text-muted-foreground"
                  aria-label="Close"
                >
                  <ChevronUp />
                </button>
              </div>
            )}

            {/* Content */}
            <AnimatePresence mode="popLayout">
              {showSuccess ? (
                <motion.div
                  key="success"
                  initial={{ y: -32, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                  className="flex min-h-[200px] sm:min-h-60  flex-col items-center justify-center p-4"
                >
                  {successChild || <PopoverFormSuccess />}
                </motion.div>
              ) : (
                <motion.div
                  key="open-child"
                  exit={{ y: 8, opacity: 0, filter: "blur(4px)" }}
                  transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                  className="border bg-white dark:bg-[#121212] rounded-xl h-full sm:h-[var(--popover-height,250px)] p-2"
                >
                  {openChild}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PopoverFormButton({
  loading,
  text = "submit",
}: {
  loading: boolean;
  text: string;
}) {
  return (
    <button
      type="submit"
      className="ml-auto flex h-8 sm:h-9 w-full sm:w-32 cursor-pointer items-center justify-center rounded-md bg-gradient-to-b from-primary/90 to-primary px-3 text-xs sm:text-sm font-semibold text-primary-foreground"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={`${loading}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          className="flex w-full rounded-2xl items-center justify-center"
        >
          {loading ? (
            <Loader className="animate-spin size-3 sm:size-4" />
          ) : (
            text
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function PopoverFormSuccess({
  title = "Success",
  description = "Thank you for your submission",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="text-center px-4">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        className="mx-auto"
      >
        <path
          d="M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392..."
          fill="#2090FF"
          fillOpacity="0.16"
        />
      </svg>
      <h3 className="mt-2 text-base sm:text-lg font-semibold">{title}</h3>
      <p className="text-sm sm:text-[15px] text-muted-foreground mt-1">
        {description}
      </p>
    </div>
  );
}

function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
