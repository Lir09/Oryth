// src/components/Typewriter.tsx
import { useEffect, useRef, useState } from "react";

type Props = {
  texts: string[];
  typeDelay?: number;
  switchDelay?: number;
  className?: string;
  markerClass?: string;
  cursorClass?: string;
  cursorChar?: string;
};

export default function Typewriter({
  texts,
  typeDelay = 120,
  switchDelay = 5000,
  className,
  markerClass = "marker",
  cursorClass = "caret",
  cursorChar = "|",
}: Props) {
  const [textIndex, setTextIndex] = useState(0);
  const [slice, setSlice] = useState(0);
  const [done, setDone] = useState(false);
  const timerRef = useRef<number | null>(null);
  const current = texts[textIndex] ?? "";

  useEffect(() => {
    if (done) return;
    if (slice < current.length) {
      timerRef.current = window.setTimeout(
        () => setSlice((s) => s + 1),
        typeDelay
      );
    } else {
      setDone(true);
    }
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [slice, current, typeDelay, done]);

  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => {
      setTextIndex((i) => (i + 1) % texts.length);
      setSlice(0);
      setDone(false);
    }, switchDelay);
    return () => window.clearTimeout(t);
  }, [done, switchDelay, texts.length]);

  const visible = current.slice(0, slice);

  return (
    <span className={className} aria-live="polite">
      <span className={markerClass}>{visible}</span>
      <span className={cursorClass} aria-hidden="true">
        {" "}
        {cursorChar}
      </span>
    </span>
  );
}
