import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Archive.css";

const YEARS = ["2026", "2025", "2024", "2023", "2022", "2021", "2020"];

const ARCHIVE_DATA = {
  "2026": [
    {
      title: "Project 01",
      desc: "2026 작업물 설명이 들어갑니다.",
      images: [
        "https://picsum.photos/seed/p2601a/400/300",
        "https://picsum.photos/seed/p2601b/400/300",
        "https://picsum.photos/seed/p2601c/400/300",
        "https://picsum.photos/seed/p2601d/400/300",
      ],
    },
    {
      title: "Project 02",
      desc: "2026 작업물 설명이 들어갑니다.",
      images: [
        "https://picsum.photos/seed/p2602a/400/300",
        "https://picsum.photos/seed/p2602b/400/300",
        "https://picsum.photos/seed/p2602c/400/300",
      ],
    },
  ],
  "2025": [
    {
      title: "Project 01",
      desc: "2025 작업물 설명이 들어갑니다.",
      images: [
        "https://picsum.photos/seed/p2501a/400/300",
        "https://picsum.photos/seed/p2501b/400/300",
      ],
    },
  ],
  "2024": [
    {
      title: "Project 01",
      desc: "2024 작업물 설명이 들어갑니다.",
      images: ["https://picsum.photos/seed/p2401a/400/300"],
    },
  ],
  "2023": [
    {
      title: "Project 01",
      desc: "2023 작업물 설명이 들어갑니다.",
      images: ["https://picsum.photos/seed/p2301a/400/300"],
    },
  ],
  "2022": [
    {
      title: "Project 01",
      desc: "2022 작업물 설명이 들어갑니다.",
      images: ["https://picsum.photos/seed/p2201a/400/300"],
    },
  ],
  "2021": [
    {
      title: "Project 01",
      desc: "2021 작업물 설명이 들어갑니다.",
      images: ["https://picsum.photos/seed/p2101a/400/300"],
    },
  ],
  "2020": [
    {
      title: "Project 01",
      desc: "2020 작업물 설명이 들어갑니다.",
      images: ["https://picsum.photos/seed/p2001a/400/300"],
    },
  ],
};

export default function Archive() {
  const [activeYear, setActiveYear] = useState("2026");
  const [activeProject, setActiveProject] = useState(null);

  const handleYearChange = (year) => {
    setActiveYear(year);
    setActiveProject(null);
  };

  const projects = ARCHIVE_DATA[activeYear];

  return (
    <motion.div
      className="archive-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 좌측 - 제목 + 연도 */}
      <div className="archive-left">
        <motion.p className="section__sub"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          2020 — 2026
        </motion.p>
        <motion.h2 className="section__title"
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          Archive
        </motion.h2>
        <motion.div className="section__divider"
          initial={{ width: 0 }} animate={{ width: 60 }} transition={{ delay: 0.3, duration: 0.5 }} />

        {/* 연도 메뉴 */}
        <motion.div className="archive__years"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          {YEARS.map((year) => (
            <button
              key={year}
              onClick={() => handleYearChange(year)}
              className={`archive__year-btn ${activeYear === year ? "archive__year-btn--active" : ""}`}
            >
              {year}
            </button>
          ))}
        </motion.div>
      </div>

      {/* 우측 - 프로젝트 목록 + 갤러리 */}
      <div className="archive-right">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeYear}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* 연도 레이블 */}
            <p className="archive__year-label">{activeYear}</p>

            {/* 프로젝트 목록 */}
            <div className="archive__project-list">
              {projects.map((item, i) => (
                <motion.div
                  key={i}
                  className={`archive__project-item ${activeProject === i ? "archive__project-item--active" : ""}`}
                  onClick={() => setActiveProject(activeProject === i ? null : i)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="archive__project-header">
                    <span className="archive__item-index">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="archive__project-info">
                      <p className="archive__item-title">{item.title}</p>
                      <p className="archive__item-desc">{item.desc}</p>
                    </div>
                    <motion.span
                      className="archive__project-arrow"
                      animate={{ rotate: activeProject === i ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      ›
                    </motion.span>
                  </div>

                  {/* 갤러리 */}
                  <AnimatePresence>
                    {activeProject === i && (
                      <motion.div
                        className="archive__gallery"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35 }}
                      >
                        <div className="archive__gallery-grid">
                          {item.images.map((src, j) => (
                            <motion.div
                              key={j}
                              className="archive__gallery-item"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: j * 0.08 }}
                            >
                              <img src={src} alt={`${item.title} ${j + 1}`} />
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
