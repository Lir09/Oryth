import Header from "../components/Header";
import Calendar, { type BwRange } from "../components/Calendar"; // ← type 키워드!
import "../style/Calendar.css";

const RANGES: BwRange[] = [
  { title: "기말고사", start: "2025-12-08", end: "2025-12-12" },
];

export default function About() {
  return (
    <>
      <Header />
      <main className="about-page about-page--minimal">
        <h1 className="about-title">About</h1>
        <Calendar initialYear={2025} initialMonth={12} ranges={RANGES} />
      </main>
    </>
  );
}
