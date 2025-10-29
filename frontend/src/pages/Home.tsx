// src/pages/Home.tsx
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Typewriter from "../components/Typewriter";
import "../style/Home.css";

type Project = {
  title: string;
  desc: string;
  to?: string; // 내부 라우트
  external?: boolean; // 외부 링크 여부
  href?: string; // 외부 링크 URL
};

const PROJECTS: Project[] = [
  // ⬆️ 자리 교체: '야자관리'를 첫 카드로
  {
    title: "Night_Learning",
    desc: "GitHub 저장소 — 프로젝트 소스, 문서 확인",
    external: true,
    href: "https://github.com/Lir09/Night_Learning",
  },

  // ⬇️ '아직 개발 중...'은 두 번째로 이동
  { title: "아직 개발 중...", desc: "아직 개발 중...", to: "/activity" },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="home">
        {/* Hero */}
        <section className="hero">
          <div className="hero__inner">
            <p className="hero__kicker">KIM GABIN · DEVELOPER</p>

            <h1 className="hero__title">
              <span className="title-prefix">김가빈 </span>
              <Typewriter
                texts={["개인사이트", "포트폴리오"]}
                typeDelay={120}
                switchDelay={5000}
                className="typewriter"
                markerClass="marker"
                cursorClass="caret"
                cursorChar="|"
              />
              <br />
            </h1>

            <p className="hero__desc"> </p>

            <div className="hero__actions">
              <Link to="/apply" className="btn btn--solid">
                협업 문의
              </Link>
              <Link to="/about" className="btn btn--ghost">
                소개 보기
              </Link>
            </div>
          </div>
        </section>

        {/* Activity / Projects */}
        <section className="features">
          <div className="section__head">
            <h2 className="section__title">Activity</h2>
            <span className="section__sub">최근 작업 일부</span>
          </div>

          <div className="features__grid">
            {PROJECTS.map((p) => (
              <article className="card" key={p.title}>
                <h3 className="card__title">{p.title}</h3>
                <p className="card__desc">{p.desc}</p>

                {/* 내부/외부 링크 분기 */}
                {p.external && p.href ? (
                  <a
                    className="card__link"
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${p.title} GitHub로 이동(새 탭)`}
                  >
                    GitHub에서 보기 ↗
                  </a>
                ) : p.to ? (
                  <Link to={p.to} className="card__link">
                    자세히 보기 →
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="about">
          <div className="about__inner">
            <h2 className="section__title">About</h2>
            <p className="about__text">
              React·TypeScript·Vite·Supabase, Unity(C#)에 익숙합니다.
            </p>
            <ul className="tags">
              <li>#React</li>
              <li>#TypeScript</li>
              <li>#Vite</li>
              <li>#Supabase</li>
              <li>#Unity</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <span>© {new Date().getFullYear()} GABIN KIM</span>
          <nav className="footer__nav">
            <Link to="/about">About</Link>
            <Link to="/activity">Activity</Link>
            <Link to="/apply">Contact</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
