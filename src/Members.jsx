import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Members.css";

const CATEGORIES = ["Current", "Alumni", "Origin"];

const MEMBERS_DATA = {
  Current: [
    { id: 1, name: "김민준", role: "UI/UX Design", intro: "인터랙션과 경험 디자인을 탐구합니다.", sns: "https://instagram.com", color: "#00ff88" },
    { id: 2, name: "이서연", role: "Visual Design", intro: "시각적 언어로 이야기를 만듭니다.", sns: "https://instagram.com", color: "#00cfff" },
    { id: 3, name: "박지호", role: "Motion Design", intro: "움직임으로 감정을 전달합니다.", sns: "https://instagram.com", color: "#ff6b6b" },
    { id: 4, name: "최유진", role: "Interaction Design", intro: "디지털과 물리의 경계를 탐구합니다.", sns: "https://instagram.com", color: "#ffd93d" },
    { id: 5, name: "정다은", role: "Branding", intro: "브랜드의 목소리를 디자인합니다.", sns: "https://instagram.com", color: "#c77dff" },
    { id: 6, name: "한승우", role: "UI Design", intro: "사용자 중심의 인터페이스를 만듭니다.", sns: "https://instagram.com", color: "#ff9a3c" },
  ],
  Alumni: [
    { id: 7, name: "황지수", role: "Visual Design", intro: "2024년 졸업, 현재 스튜디오 재직 중.", sns: "https://instagram.com", color: "#00ff88" },
    { id: 8, name: "윤수일", role: "Motion Design", intro: "2023년 졸업, 프리랜서 디자이너.", sns: "https://instagram.com", color: "#00cfff" },
    { id: 9, name: "신지은", role: "UX Design", intro: "2023년 졸업, IT기업 재직 중.", sns: "https://instagram.com", color: "#ff6b6b" },
    { id: 10, name: "김도기", role: "Branding", intro: "2022년 졸업, 브랜딩 에이전시 재직 중.", sns: "https://instagram.com", color: "#ffd93d" },
  ],
  Origin: [
    { id: 11, name: "오지수", role: "Visual Design", intro: "2024년 졸업, 현재 스튜디오 재직 중.", sns: "https://instagram.com", color: "#00ff88" },
    { id: 12, name: "윤태양", role: "Motion Design", intro: "2023년 졸업, 프리랜서 디자이너.", sns: "https://instagram.com", color: "#00cfff" },
    { id: 13, name: "신예은", role: "UX Design", intro: "2023년 졸업, IT기업 재직 중.", sns: "https://instagram.com", color: "#ff6b6b" },
    { id: 14, name: "임도현", role: "Branding", intro: "2022년 졸업, 브랜딩 에이전시 재직 중.", sns: "https://instagram.com", color: "#ffd93d" },
  ],
};

function randomBubbles(members) {
  return members.map((m, i) => ({
    ...m,
    x: 10 + (i % 3) * 30 + Math.random() * 10,
    y: 10 + Math.floor(i / 3) * 40 + Math.random() * 10,
    size: 90 + Math.random() * 30,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
  }));
}

export default function Members() {
  const [activeCategory, setActiveCategory] = useState("Current");
  const [bubbles, setBubbles] = useState(() => randomBubbles(MEMBERS_DATA["Current"]));
  const [selected, setSelected] = useState(null);
  const animRef = useRef(null);
  const bubblesRef = useRef(bubbles);

  // 카테고리 바뀌면 물방울 재생성
  const handleCategory = (cat) => {
    setActiveCategory(cat);
    setSelected(null);
    const newBubbles = randomBubbles(MEMBERS_DATA[cat]);
    bubblesRef.current = newBubbles;
    setBubbles(newBubbles);
  };

  // 물방울 애니메이션
  useEffect(() => {
    const animate = () => {
      bubblesRef.current = bubblesRef.current.map((b) => {
        let nx = b.x + b.vx;
        let ny = b.y + b.vy;
        let nvx = b.vx;
        let nvy = b.vy;
        if (nx < 2 || nx > 88) nvx = -nvx;
        if (ny < 2 || ny > 80) nvy = -nvy;
        return { ...b, x: nx, y: ny, vx: nvx, vy: nvy };
      });
      setBubbles([...bubblesRef.current]);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <motion.div
      className="members-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 좌측 - 제목 + 서브메뉴 */}
      <div className="members-left">
        <motion.p className="section__sub"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          HIVCD PROTO
        </motion.p>
        <motion.h2 className="section__title"
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          Members
        </motion.h2>
        <motion.div className="section__divider"
          initial={{ width: 0 }} animate={{ width: 60 }} transition={{ delay: 0.3, duration: 0.5 }} />

        {/* 서브메뉴 */}
        <motion.div
          className="members__categories"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`members__cat-btn ${activeCategory === cat ? "members__cat-btn--active" : ""}`}
            >
              {cat}
              <span className="members__cat-count">
                {MEMBERS_DATA[cat].length}
              </span>
            </button>
          ))}
        </motion.div>

        <motion.p
          className="members__hint"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          물방울을 클릭해서 멤버를 확인하세요
        </motion.p>
      </div>

      {/* 우측 - 물방울 */}
      <div className="members-right">
        <AnimatePresence>
          {bubbles.map((b) => (
            <motion.div
              key={b.id}
              className="bubble"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: b.size,
                height: b.size,
                background: `radial-gradient(circle at 35% 35%, ${b.color}33, ${b.color}11)`,
                border: `1.5px solid ${b.color}55`,
                boxShadow: `0 0 20px ${b.color}22`,
              }}
              whileHover={{ scale: 1.15 }}
              onClick={() => setSelected(b)}
            >
              <span className="bubble__name" style={{ color: b.color }}>
                {b.name.charAt(0)}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 모달 */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="modal-dim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />

            <div className="modal-wrapper">
              <motion.div
                className="modal-card"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
              <div
                className="modal-avatar"
                style={{
                  background: `radial-gradient(circle at 35% 35%, ${selected.color}44, ${selected.color}11)`,
                  border: `2px solid ${selected.color}66`,
                  boxShadow: `0 0 40px ${selected.color}33`,
                }}
              >
                <span style={{ color: selected.color, fontSize: "2.5rem", fontFamily: "'Space Mono', monospace", fontWeight: 700 }}>
                  {selected.name.charAt(0)}
                </span>
              </div>
              <p className="modal-role" style={{ color: selected.color }}>{selected.role}</p>
              <h3 className="modal-name">{selected.name}</h3>
              <p className="modal-intro">{selected.intro}</p>
              <a
                href={selected.sns}
                target="_blank"
                rel="noreferrer"
                className="modal-sns"
                style={{ borderColor: `${selected.color}44`, color: selected.color }}
              >
                Instagram ↗
              </a>
            </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
