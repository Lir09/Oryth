// ===== Header.tsx (No Tailwind, Paperlogy font, gold accent) =====
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logoUrl from "../assets/KakaoTalk_20251026_002919547-removebg-preview.png"; // 경로 맞춰주세요
import "../style/Header.css";

const NAV = [
  { to: "/", label: "HOME" },
  { to: "/about", label: "ABOUT" },
  { to: "/activity", label: "ACTIVITY" },
  { to: "/apply", label: "APPLY" },
  { to: "/staff", label: "STAFF" },
  { to: "/notion", label: "NOTION" },
];

export default function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={"hdr-root" + (scrolled ? " is-scrolled" : "")}>
      <div className="hdr-topline" />

      <div className="hdr-shell">
        <Link to="/" className="hdr-brand">
          <img
            src={logoUrl}
            alt="logo"
            className="hdr-logo"
            draggable={false}
          />
          <span className="hdr-wordmark">FINDER</span>
        </Link>

        <nav className="hdr-nav">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={
                "hdr-link" + (pathname === item.to ? " is-active" : "")
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className="hdr-burger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={"hdr-drawer" + (open ? " is-open" : "")}>
          {NAV.map((item) => (
            <Link key={item.to} to={item.to} className="hdr-drawer-item">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
