// src/components/Calendar.tsx
import { useMemo, useState } from "react";
import "../style/Calendar.css";

export type BwEvents = Record<string, string[]>; // "YYYY-MM-DD": ["라벨", ...]
export type BwRange = { title: string; start: string; end?: string };
type Mode = "month" | "week";

type Props = {
  initialYear?: number;
  initialMonth?: number; // 1~12
  /** 특정 날짜에 바로 매핑하는 이벤트들(선택) */
  events?: BwEvents;
  /** 기간 일정(자동으로 start~end까지 확장) */
  ranges?: BwRange[];
  className?: string;
};

const pad = (n: number) => String(n).padStart(2, "0");
const toISO = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

function startOfMonthGrid(y: number, mZeroBased: number) {
  const first = new Date(y, mZeroBased, 1);
  return new Date(y, mZeroBased, 1 - first.getDay()); // 첫 주 일요일
}
function startOfWeek(d: Date) {
  const t = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return new Date(t.setDate(t.getDate() - t.getDay())); // 일요일
}
function parseISO(s: string) {
  const [yy, mm, dd] = s.split("-").map(Number);
  return new Date(yy, mm - 1, dd);
}
function expandRanges(ranges?: BwRange[]): BwEvents {
  const map: BwEvents = {};
  if (!ranges) return map;
  for (const r of ranges) {
    const s = parseISO(r.start);
    s.setHours(0, 0, 0, 0);
    const e = parseISO(r.end ?? r.start);
    e.setHours(0, 0, 0, 0);
    const cur = new Date(s);
    while (cur.getTime() <= e.getTime()) {
      const key = toISO(cur);
      (map[key] ??= []).push(r.title);
      cur.setDate(cur.getDate() + 1);
    }
  }
  return map;
}
function mergeEvents(a: BwEvents, b: BwEvents): BwEvents {
  const out: BwEvents = { ...a };
  for (const k in b) out[k] = [...(out[k] ?? []), ...b[k]];
  return out;
}

export default function Calendar({
  initialYear,
  initialMonth,
  events = {},
  ranges = [],
  className,
}: Props) {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const init = new Date(
    initialYear ?? today.getFullYear(),
    (initialMonth ?? today.getMonth() + 1) - 1,
    1
  );

  const [viewDate, setViewDate] = useState(init);
  const [mode, setMode] = useState<Mode>("month");

  // ranges를 일자 맵으로 확장 후 기존 events와 병합
  const eventMap = useMemo(
    () => mergeEvents(events, expandRanges(ranges)),
    [events, ranges]
  );

  // 상단 라벨
  const monthLabel = useMemo(() => {
    if (mode === "month") {
      return `${viewDate.getFullYear()}년 ${viewDate.getMonth() + 1}월`;
    }
    const s = startOfWeek(viewDate);
    const e = new Date(s);
    e.setDate(e.getDate() + 6);
    const fmt = (d: Date) =>
      `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
    return `${fmt(s)} ~ ${fmt(e)}`;
  }, [viewDate, mode]);

  // 셀 목록
  const cells = useMemo(() => {
    if (mode === "week") {
      const s = startOfWeek(viewDate);
      return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(s);
        d.setDate(s.getDate() + i);
        return { d, inMonth: true };
      });
    }
    const y = viewDate.getFullYear();
    const m = viewDate.getMonth();
    const first = startOfMonthGrid(y, m);
    const list: { d: Date; inMonth: boolean }[] = [];
    let cur = new Date(first);
    for (let i = 0; i < 42; i++) {
      const d = new Date(cur);
      list.push({ d, inMonth: d.getMonth() === m });
      cur.setDate(cur.getDate() + 1);
    }
    return list;
  }, [viewDate, mode]);

  // 네비게이션
  const goPrev = () => {
    if (mode === "month") {
      setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    } else {
      const d = new Date(viewDate);
      d.setDate(d.getDate() - 7);
      setViewDate(d);
    }
  };
  const goNext = () => {
    if (mode === "month") {
      setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    } else {
      const d = new Date(viewDate);
      d.setDate(d.getDate() + 7);
      setViewDate(d);
    }
  };

  const weeks = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <section className={`bwcal ${className ?? ""}`}>
      <header className="bwcal__bar">
        <div className="bwcal__nav">
          <button className="bwbtn" onClick={goPrev} aria-label="이전">
            ‹
          </button>
          <strong className="bwcal__label" aria-live="polite">
            {monthLabel}
          </strong>
          <button className="bwbtn" onClick={goNext} aria-label="다음">
            ›
          </button>
        </div>
        <div className="bwcal__views">
          <button
            className={`bwbtn ${mode === "month" ? "is-active" : ""}`}
            onClick={() => setMode("month")}
          >
            월
          </button>
          <button
            className={`bwbtn ${mode === "week" ? "is-active" : ""}`}
            onClick={() => setMode("week")}
          >
            주
          </button>
        </div>
      </header>

      <div className="bwcal__head" aria-hidden>
        {weeks.map((w) => (
          <div key={w} className="bwcal__w">
            {w}
          </div>
        ))}
      </div>

      <div
        className={`bwcal__grid ${mode === "week" ? "is-week" : ""}`}
        role="grid"
        aria-label={monthLabel}
      >
        {cells.map(({ d, inMonth }, i) => {
          const day = d.getDate();
          const isToday =
            d.getFullYear() === today.getFullYear() &&
            d.getMonth() === today.getMonth() &&
            day === today.getDate();

          const key = toISO(d);
          const eventTitle = eventMap[key]?.[0]; // 첫 라벨만 사용
          const hasEvent = Boolean(eventTitle);

          return (
            <div
              key={`${key}-${i}`}
              className={`bwcell ${inMonth ? "is-month" : "is-out"} ${
                isToday ? "is-today" : ""
              } ${hasEvent ? "has-event" : ""}`}
              role="gridcell"
              title={hasEvent ? eventTitle : undefined}
              aria-label={`${d.toLocaleDateString("ko-KR")}${
                hasEvent ? `: ${eventTitle}` : ""
              }`}
            >
              <div className="bwcell__inner">
                <div className="bwcell__date">
                  <span className="bw-pill">{day}</span>
                </div>
                {hasEvent && <div className="bw-tag">{eventTitle}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
