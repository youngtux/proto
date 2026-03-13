import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Works.css";

const CATEGORIES = ["All", "Interaction", "Visual", "Branding", "Motion"];

const WORKS_DATA = {
  All: [
    { title: "Work 01", category: "Interaction", desc: "작업물 설명이 들어갑니다." },
    { title: "Work 02", category: "Visual", desc: "작업물 설명이 들어갑니다." },
    { title: "Work 03", category: "Branding", desc: "작업물 설명이 들어갑니다." },
    { title: "Work 04", category: "Motion", desc: "작업물 설명이 들어갑니다." },
    { title: "Work 05", category: "Interaction", desc: "작업물 설명이 들어갑니다." },
    { title: "Work 06", category: "Visual", desc: "작업물 설명이 들어갑니다." },
  ],
  Interaction: [
    { title: "Work 01", category: "Interaction", desc: "작업물 설명이 들어갑니다." },
    { title: "Work 05", category: "Interaction", desc: "작업물 설명이 들어갑니다." },
  ],
  Visual: [
    { title: "Work 02", category: "Visual", desc: "작업물 설명이 들어갑니다." },
    { title: "Work 06", category: "Visual", desc: "작업물 설명이 들어갑니다." },
  ],
  Branding: [
    { title: "Work 03", category: "Branding", desc: "작업물 설명이 들어갑니다." },
  ],
  Motion: [
    { title: "Work 04", category: "Motion", desc: "작업물 설명이 들어갑니다." },
  ],
};

export default function Works() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <motion.div
      className="works-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 좌측 - 제목 */}
      <div className="works-left">
        <motion.p
          className="section__sub"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          HIVCD PROTO
        </motion.p>
        <motion.h2
          className="section__title"
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          Works
        </motion.h2>
        <motion.div
          className="section__divider"
          initial={{ width: 0 }} animate={{ width: 60 }} transition={{ delay: 0.3, duration: 0.5 }} />

        {/* 카테고리 메뉴 */}
        <motion.div
          className="works__categories"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`works__cat-btn ${activeCategory === cat ? "works__cat-btn--active" : ""}`}
            >
              {cat}
              <span className="works__cat-count">
                {WORKS_DATA[cat].length}
              </span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* 우측 - 3열 그리드 */}
      <div className="works-right">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="works__grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {WORKS_DATA[activeCategory].map((item, i) => (
              <motion.div
                key={i}
                className="works__item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* 썸네일 영역 */}
                <div className="works__thumb">
                  <span className="works__thumb-index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* 정보 */}
                <div className="works__info">
                  <span className="works__info-category">{item.category}</span>
                  <p className="works__info-title">{item.title}</p>
                  <p className="works__info-desc">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
