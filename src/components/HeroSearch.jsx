import { useState, useEffect, useRef } from "react";
import { GRADE_STYLES, CLASS_META, avatarColor } from "../data/data";

export default function HeroSearch({ members, onSelectMember, onGoToMembers }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const results = query.trim()
    ? members.filter((m) => {
        const q = query.trim();
        return (
          m.name.includes(q) ||
          m.car.replace(/\s/g, "").includes(q.replace(/\s/g, ""))
        );
      })
    : [];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function handleSelect(id) {
    setQuery("");
    setOpen(false);
    onSelectMember(id);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setOpen(false);
    onGoToMembers(query);
  }

  return (
    <div ref={ref} className="relative max-w-lg mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex rounded-2xl overflow-hidden shadow-2xl shadow-black/25"
      >
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="회원 이름 or 차량 번호를 검색하세요..."
          className="flex-1 px-5 py-4 text-sm bg-white/95 text-slate-800 placeholder-slate-400 outline-none"
          autoComplete="off"
        />
        <button
          type="submit"
          className="bg-accent hover:bg-accent-hover text-primary font-bold px-6 text-sm transition-colors duration-150 flex items-center gap-2 flex-shrink-0"
        >
          🔍 검색
        </button>
      </form>

      {open && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-slide-down">
          {results.length === 0 ? (
            <div className="px-5 py-6 text-center text-slate-400 text-sm">
              검색 결과가 없습니다.
            </div>
          ) : (
            results.map((m) => {
              const classMeta = CLASS_META[m.timeClass];
              return (
                <button
                  key={m.id}
                  onClick={() => handleSelect(m.id)}
                  className="w-full flex items-center gap-3.5 px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-0 transition-colors duration-150 text-left"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-base flex-shrink-0"
                    style={{ background: avatarColor(m.id) }}
                  >
                    {m.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 text-sm">{m.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {m.grade} · 가입 {2026 - m.joinYear}년차 ·{" "}
                      {classMeta?.emoji} {m.timeClass}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold flex-shrink-0 ${GRADE_STYLES[m.grade]}`}
                  >
                    {m.grade}
                  </span>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
