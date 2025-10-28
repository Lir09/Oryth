import { useEffect, useRef, useState } from "react";

type Props = {
  texts: string[]; // 예: ["개 인 사 이 트", "포 르 트 폴 리 오"]
  typeDelay?: number; // 글자당 딜레이 ms
  switchDelay?: number; // 완성 후 다음 문구로 바꾸는 대기 ms
  className?: string; // 외부 스타일링 용
  markerClass?: string; // 형광펜 클래스 (텍스트 영역만)
  cursorClass?: string; // 커서 클래스
  cursorChar?: string; // 기본 "|"
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

  // 한 글자씩 증가
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

  // 완성 후 일정 시간 뒤 다음 텍스트로 전환(지우고 처음부터 다시 타이핑)
  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => {
      setTextIndex((i) => (i + 1) % texts.length);
      setSlice(0);
      setDone(false);
    }, switchDelay);
    return () => window.clearTimeout(t);
  }, [done, switchDelay, texts.length]);

  const visible = current.slice(0, slice); // 진짜로 잘라서 출력

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
