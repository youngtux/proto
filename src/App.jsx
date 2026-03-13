import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Archive from "./Archive";
import Works from "./Works";
import "./App.css";
import logo from "./assets/proto_logo.jpg"; // 파일명에 맞게 수정

// ── 인트로 ──────────────────────────────────────
function Intro({ onDone }) {
  const [fade, setFade] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 900),
      setTimeout(() => setStep(3), 1500),
      setTimeout(() => setStep(4), 2200),
      setTimeout(() => setFade(true), 3200),
      setTimeout(() => onDone(), 3800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  const letters = "PROTO".split("");

  return (
    <motion.div
      className="intro"
      animate={{ opacity: fade ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      style={{ pointerEvents: fade ? "none" : "all" }}
    >
      {/* 배경 그리드 라인 */}
      <div className="intro__grid-bg">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="intro__grid-line"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: step >= 1 ? 1 : 0 }}
            transition={{ delay: i * 0.06, duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* 수평 스캔라인 */}
      {step >= 1 && (
        <motion.div
          className="intro__scanline"
          animate={{ y: ["-100vh", "100vh"] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />
      )}

      <div className="intro__inner">
        {/* 로고 원 */}
        <motion.div
          className="intro__logo"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: step >= 1 ? 1 : 0, rotate: step >= 1 ? 0 : -180 }}
          transition={{ duration: 0.7, ease: "backOut" }}
        >
          <img src={logo} alt="PROTO" className="intro__logo-img" />
        </motion.div>

        {/* PROTO 글자 - 한 글자씩 등장 */}
        <div className="intro__letters">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              className="intro__letter"
              initial={{ opacity: 0, y: 40, rotateX: -90 }}
              animate={{
                opacity: step >= 2 ? 1 : 0,
                y: step >= 2 ? 0 : 40,
                rotateX: step >= 2 ? 0 : -90,
              }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* 서브타이틀 타이핑 효과 */}
        {step >= 3 && (
          <motion.p
            className="intro__sub"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            transition={{ duration: 0.8 }}
          >
            {"HIVCD Interaction Design Group".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>
        )}

        {/* 하단 로딩 바 */}
        {step >= 3 && (
          <motion.div className="intro__loader">
            <motion.div
              className="intro__loader-bar"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </motion.div>
        )}

        {/* 떠다니는 연도 */}
        {step >= 2 && ["proactive", "professional", "progressive", "proto", "design"].map((word, i) => (
        <motion.span
          key={word}
          style={{
            position: "absolute",
            fontFamily: "'Space Mono', monospace",
            fontSize: `${0.9 + i * 0.15}rem`,
            color: "#00ff88",
            left: `${8 + i * 17}%`,
            top: `${15 + (i % 3) * 20}%`,
            pointerEvents: "none",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0, 0.15, 0.08], y: [20, 0, -10] }}
          transition={{
            duration: 2,
            delay: i * 0.2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {word}
        </motion.span>
      ))}

        {/* 코너 데코 */}
        {step >= 4 && (
          <>
            {[
              { top: "10%", left: "5%" },
              { top: "10%", right: "5%" },
              { bottom: "10%", left: "5%" },
              { bottom: "10%", right: "5%" },
            ].map((pos, i) => (
              <motion.div
                key={i}
                className="intro__corner"
                style={pos}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              />
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
}

// ── 네비게이션 ───────────────────────────────────
const NAV_ITEMS = ["About", "Members", "Works", "Archive"];

function Navbar({ current, onNav }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // 화면 크기 바뀌면 메뉴 닫기
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <span className="navbar__logo-p">P</span>ROTO
      </div>
      <ul className="navbar__links">
        {NAV_ITEMS.map((item) => (
          <li key={item}>
            <button
              onClick={() => onNav(item)}
              className={`navbar__btn ${current === item ? "navbar__btn--active" : ""}`}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
      <button className="navbar__hamburger" onClick={() => setMenuOpen((v) => !v)}>☰</button>
      {menuOpen && (
        <ul className="navbar__dropdown">
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <button
                onClick={() => { onNav(item); setMenuOpen(false); }}
                className={`navbar__dropdown-btn ${current === item ? "navbar__btn--active" : ""}`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

// ── 각 섹션 ──────────────────────────────────────
const SECTIONS = {
  About: {
    title: "PROTO",
    sub: "HIVCD Interaction Design Group",
    desc: "홍익대학교 시각디자인과 인터랙션 디자인 소모임입니다.\n디지털 인터랙션과 시각 커뮤니케이션의 경계를 탐구합니다.\n\nHIVCD Interaction Design Group\nHongik University Visual Communication Design",
  },
  Members: { title: "Members", sub: "2026 활동 멤버", desc: "멤버 정보가 여기에 표시됩니다." },
};

function Section({ name }) {
  // Archive는 별도 컴포넌트
  if (name === "Archive") return <Archive />;
  if (name === "Works") return <Works />;
  const s = SECTIONS[name];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={name}
        className="section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="section__inner">
          <motion.p className="section__sub"
            initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 0.1 }}>
            {s.sub}
          </motion.p>
          <motion.h2 className="section__title"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
            {s.title}
          </motion.h2>
          <motion.div className="section__divider"
            initial={{ width: 0 }} animate={{ width: 60 }} transition={{ delay: 0.3, duration: 0.5 }} />
          <motion.p className="section__desc"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            {s.desc}
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── 메인 ─────────────────────────────────────────
export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [current, setCurrent] = useState("About");

  return (
    <>
      {showIntro && <Intro onDone={() => setShowIntro(false)} />}
      <Navbar current={current} onNav={setCurrent} />
      <Section name={current} />
    </>
  );
}
