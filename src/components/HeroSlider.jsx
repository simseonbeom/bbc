import { useState, useEffect, useCallback } from 'react'

// 구글 시트에 slides 탭이 없을 때 사용하는 기본 이미지
const DEFAULT_SLIDES = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1400&q=75&auto=format',
    label: '열정적인 경기',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1617116442849-28a84b1e9b85?w=1400&q=75&auto=format',
    label: '클럽 활동',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1400&q=75&auto=format',
    label: '함께하는 BBC',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=75&auto=format',
    label: '정기 모임',
  },
]

const INTERVAL = 5000

export default function HeroSlider({ slides }) {
  const items = (slides && slides.length > 0) ? slides : DEFAULT_SLIDES
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setCurrent((c) => (c + 1) % items.length), [items.length])
  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length)

  useEffect(() => {
    if (paused || items.length <= 1) return
    const t = setInterval(next, INTERVAL)
    return () => clearInterval(t)
  }, [paused, next, items.length])

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* 이미지 레이어 */}
      {items.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={slide.imageUrl}
            alt={slide.label ?? ''}
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      {/* 어두운 그라디언트 오버레이 — 텍스트 가독성 */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/75 via-primary/60 to-primary-dark/80" />

      {/* 좌우 화살표 */}
      {items.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 text-white transition-all duration-150 backdrop-blur-sm"
            aria-label="이전"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 text-white transition-all duration-150 backdrop-blur-sm"
            aria-label="다음"
          >
            ›
          </button>
        </>
      )}

      {/* 하단 도트 */}
      {items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-5 h-2 bg-accent'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`슬라이드 ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* 현재 슬라이드 라벨 */}
      {items[current]?.label && (
        <div className="absolute bottom-8 right-5 z-10">
          <span className="text-white/50 text-xs bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {items[current].label}
          </span>
        </div>
      )}
    </div>
  )
}
