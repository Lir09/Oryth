// src/pages/Activity.tsx  (정석 해결 버전: activity__inner 도입)
import Header from "../components/Header";
import { Link } from "react-router-dom";
import "../style/Activity.css";

type Project = {
  title: string;
  desc: string;
  to?: string;
  external?: boolean;
  href?: string;
  tag?: string;
};

const PROJECTS: Project[] = [
  {
    title: "Night_Learning",
    desc: "GitHub 저장소 — 프로젝트 소스, 문서 확인",
    external: true,
    href: "https://github.com/Lir09/Night_Learning",
    tag: "GitHub",
  },
  { title: "아직 개발 중...", desc: "아직 개발 중...", to: "/about" },
];

export default function Activity() {
  return (
    <>
      <Header />
      <main className="activity">
        <div className="activity__inner">
          <section className="activity__head">
            <h1 className="activity__title">프로젝트 보드</h1>
            <p className="activity__sub">진행 중/완료된 작업들을 한눈에</p>
          </section>

          <section className="activity__grid">
            {PROJECTS.map((p) => (
              <article className="proj" key={p.title}>
                <div className="proj__body">
                  <div className="proj__top">
                    <h3 className="proj__title">{p.title}</h3>
                    {p.tag && <span className="proj__tag">{p.tag}</span>}
                  </div>
                  <p className="proj__desc">{p.desc}</p>
                </div>
                <div className="proj__actions">
                  {p.external && p.href ? (
                    <a
                      className="btn btn--solid"
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      열기
                    </a>
                  ) : p.to ? (
                    <Link className="btn btn--ghost" to={p.to}>
                      이동
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
