import { useState, useEffect, Fragment } from 'react'
import { GRADE_STYLES, CLASS_META, avatarColor } from '../data/data'
import MemberDetail from '../components/MemberDetail'

function useIsMobile(bp = 768) {
  const [mobile, setMobile] = useState(() => window.innerWidth < bp)
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < bp)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [bp])
  return mobile
}

const GRADES = ['전체', 'S급', 'A급', 'B급', 'C급', 'D급']
const CLASSES = ['전체', '새벽반', '오전반', '저녁반']

function FilterChip({ label, active, onClick, customActive }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 whitespace-nowrap
        ${active
          ? (customActive ?? 'bg-primary text-white border-primary')
          : 'bg-white text-slate-500 border-slate-200 hover:border-primary hover:text-primary'
        }
      `}
    >
      {label}
    </button>
  )
}

function MemberRow({ member, isSelected, onClick }) {
  const years = 2026 - member.joinYear
  const classMeta = CLASS_META[member.timeClass]

  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-3.5 px-5 py-3.5 cursor-pointer transition-all duration-150 border-b border-slate-100 last:border-0
        ${isSelected
          ? 'bg-accent/5 border-l-[3px] border-l-accent'
          : 'hover:bg-slate-50 border-l-[3px] border-l-transparent'
        }
      `}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-base flex-shrink-0"
        style={{ background: avatarColor(member.id) }}
      >
        {member.name[0]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-slate-800 text-sm">{member.name}</p>
        <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
          <span>가입 {years}년차</span>
          <span>·</span>
          {classMeta && <span>{classMeta.emoji} {member.timeClass}</span>}
        </p>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${GRADE_STYLES[member.grade]}`}>
          {member.grade}
        </span>
        {member.isNew && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
            NEW
          </span>
        )}
      </div>
    </div>
  )
}

export default function MembersPage({ members, initialSelectedId, onClearInitial }) {
  const [selectedId, setSelectedId] = useState(initialSelectedId ?? null)
  const [gradeFilter, setGradeFilter] = useState('전체')
  const [classFilter, setClassFilter] = useState('전체')
  const [search, setSearch] = useState('')
  const isMobile = useIsMobile()

  useEffect(() => {
    if (initialSelectedId != null) {
      setSelectedId(initialSelectedId)
      setGradeFilter('전체')
      setClassFilter('전체')
      setSearch('')
      onClearInitial?.()
    }
  }, [initialSelectedId])

  const filtered = members.filter((m) => {
    const q = search.trim()
    const matchSearch = !q || m.name.includes(q) || m.car.replace(/\s/g, '').includes(q.replace(/\s/g, ''))
    const matchGrade  = gradeFilter === '전체' || m.grade === gradeFilter
    const matchClass  = classFilter === '전체' || m.timeClass === classFilter
    const matchNew    = gradeFilter !== 'new'  || m.isNew
    return matchSearch && (gradeFilter === 'new' ? matchNew : matchGrade) && matchClass
  })

  const selectedMember = filtered.find((m) => m.id === selectedId) ?? null

  function toggleSelect(id) {
    setSelectedId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 animate-fade-up">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-primary">회원 관리</h1>
        <p className="text-sm text-slate-500 mt-1">BBC 클럽 전체 회원을 검색하고 상세 정보를 확인하세요.</p>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl shadow-sm px-5 py-4 mb-6 space-y-3">
        <div className="flex items-center gap-2 border-2 border-slate-200 focus-within:border-accent rounded-xl overflow-hidden transition-colors duration-150">
          <span className="pl-4 text-slate-400 text-base">🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="이름으로 검색..."
            className="flex-1 py-2.5 pr-4 text-sm outline-none bg-transparent text-slate-800 placeholder-slate-400"
            autoComplete="off"
          />
          {search && (
            <button onClick={() => setSearch('')} className="pr-3 text-slate-400 hover:text-slate-600 text-lg">
              ×
            </button>
          )}
        </div>

        {/* Time class */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-400 mr-1">반</span>
          {CLASSES.map((c) => {
            const meta = CLASS_META[c]
            return (
              <FilterChip
                key={c}
                label={meta ? `${meta.emoji} ${c}` : c}
                active={classFilter === c}
                onClick={() => setClassFilter(c)}
                customActive={meta?.activeClass}
              />
            )
          })}
        </div>

        {/* Grade */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-400 mr-1">급수</span>
          {GRADES.map((g) => (
            <FilterChip
              key={g}
              label={g}
              active={gradeFilter === g}
              onClick={() => setGradeFilter(g)}
            />
          ))}
          <FilterChip
            label="🆕 신규"
            active={gradeFilter === 'new'}
            onClick={() => setGradeFilter(gradeFilter === 'new' ? '전체' : 'new')}
            customActive="bg-red-500 text-white border-red-500"
          />
        </div>
      </div>

      {/* Layout */}
      <div className={!isMobile ? 'grid grid-cols-detail gap-6 items-start' : ''}>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-100">
            <span className="text-sm text-slate-500">
              총 <strong className="text-primary">{filtered.length}</strong>명
            </span>
            <span className="text-xs text-slate-400 hidden sm:block">
              클릭하면 상세정보를 확인할 수 있어요
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">검색 결과가 없습니다.</div>
          ) : (
            <div>
              {filtered.map((member) => (
                <Fragment key={member.id}>
                  <MemberRow
                    member={member}
                    isSelected={selectedId === member.id}
                    onClick={() => toggleSelect(member.id)}
                  />
                  {/* 모바일 아코디언: 선택한 행 바로 아래에 상세 표시 */}
                  {isMobile && selectedId === member.id && (
                    <MemberDetail member={member} inline />
                  )}
                </Fragment>
              ))}
            </div>
          )}
        </div>

        {/* 데스크톱 스티키 패널 */}
        {!isMobile && (
          <div className="sticky top-20">
            <MemberDetail member={selectedMember} />
          </div>
        )}
      </div>
    </div>
  )
}
