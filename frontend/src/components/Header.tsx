// src/components/Header.tsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoUrl from "../assets/logo.png";
import "../style/Header.css";

const NAV = [
  { to: "/", label: "HOME" },
  { to: "/about", label: "ABOUT" },
  { to: "/activity", label: "ACTIVITY" },
  { to: "/apply", label: "APPLY" },
  {
    to: "/notion",
    label: "NOTION",
    external: true,
    href: "https://www.notion.so/201cb77e1e7d80af92d8d84e0ac634b0?source=copy_link",
  },
];

export default function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 스크롤 시 그림자 토글
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 라우트 변경 시 드로어 닫기
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // ESC로 닫기 + 바디 스크롤 잠금
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`hdr-root ${scrolled ? "is-scrolled" : ""} ${
          open ? "is-open" : ""
        }`}
      >
        <div className="hdr-topline" aria-hidden />
        <div className="hdr-inner">
          <Link className="hdr-brand" to="/" aria-label="홈으로">
            <img className="hdr-logo" src={logoUrl} alt="Logo" />
            <span className="hdr-wordmark" aria-hidden>
              Brand
            </span>
          </Link>

          {/* 데스크톱 네비 */}
          <nav className="hdr-nav" aria-label="주요 메뉴">
            {NAV.map((it) =>
              it.external ? (
                <a
                  key={it.label}
                  className={`hdr-link ${
                    pathname === it.to ? "is-active" : ""
                  }`}
                  href={it.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {it.label}
                </a>
              ) : (
                <Link
                  key={it.label}
                  to={it.to}
                  className={`hdr-link ${
                    pathname === it.to ? "is-active" : ""
                  }`}
                >
                  {it.label}
                </Link>
              )
            )}
          </nav>

          {/* 버거 버튼 */}
          <button
            className="hdr-burger"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="bar" />
          </button>
        </div>

        {/* 우측 슬라이드 드로어 */}
        <aside
          id="mobile-drawer"
          className="hdr-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="모바일 메뉴"
        >
          <button
            className="hdr-drawer-close"
            aria-label="메뉴 닫기"
            onClick={() => setOpen(false)}
          />
          <nav className="hdr-drawer-nav">
            {NAV.map((it) =>
              it.external ? (
                <a
                  key={it.label}
                  className="hdr-drawer-link"
                  href={it.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                >
                  {it.label}
                </a>
              ) : (
                <Link
                  key={it.label}
                  to={it.to}
                  className="hdr-drawer-link"
                  onClick={() => setOpen(false)}
                >
                  {it.label}
                </Link>
              )
            )}
          </nav>
        </aside>

        {/* 오버레이 */}
        <div
          className="hdr-overlay"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      </header>
    </>
  );
}
