import { avatarColor, GRADE_STYLES, CLASS_META } from '../data/data'

function TensionBar({ tension }) {
  const max = 32
  const pct = Math.round((tension / max) * 100)
  const level = tension <= 21 ? '낮음' : tension <= 25 ? '보통' : tension <= 28 ? '높음' : '매우 높음'

  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-primary-light transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-slate-700">
        {tension}lbs
        <span className="text-xs text-slate-400 ml-1">({level})</span>
      </span>
    </div>
  )
}

function Field({ label, value, children }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-slate-500 flex-shrink-0">{label}</span>
      <span className="text-sm font-semibold text-slate-800 text-right">
        {children ?? value}
      </span>
    </div>
  )
}

// Empty state (no member selected)
function EmptyState() {
  return (
    <div className="py-14 px-6 text-center text-slate-400">
      <div className="text-5xl mb-4 opacity-40">🏸</div>
      <p className="text-sm leading-relaxed">
        회원을 선택하면<br />상세 정보가 표시됩니다.
      </p>
    </div>
  )
}

export default function MemberDetail({ member, inline = false }) {
  if (!member) return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <EmptyState />
    </div>
  )

  const years = 2026 - member.joinYear
  const classMeta = CLASS_META[member.timeClass]

  const wrapClass = inline
    ? 'bg-slate-50 border-t border-b border-slate-100 animate-slide-down'
    : 'bg-white rounded-xl shadow-sm overflow-hidden'

  return (
    <div className={wrapClass}>
      {/* Header */}
      <div
        className={`relative overflow-hidden px-7 py-8 text-center ${inline ? 'bg-gradient-to-br from-primary-dark via-primary to-primary-light' : 'bg-gradient-to-br from-primary-dark via-primary to-primary-light'}`}
      >
        {/* decorative circles */}
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-accent/10 rounded-full" />
        <div className="absolute -bottom-10 -left-6 w-28 h-28 bg-white/5 rounded-full" />

        <div
          className="relative w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center text-2xl font-black text-white shadow-lg"
          style={{ background: avatarColor(member.id) }}
        >
          {member.name[0]}
        </div>
        <h3 className="text-white text-xl font-extrabold mb-2 relative">{member.name}</h3>
        <div className="flex items-center justify-center gap-2 flex-wrap relative">
          <span className="bg-accent/20 text-accent text-xs font-bold px-3 py-1 rounded-full">
            🏸 {member.grade}
          </span>
          <span className="bg-white/10 text-white/80 text-xs px-3 py-1 rounded-full">
            가입 {years}년차
          </span>
          {classMeta && (
            <span className="bg-white/10 text-white/80 text-xs px-3 py-1 rounded-full">
              {classMeta.emoji} {member.timeClass}
            </span>
          )}
          {member.isNew && (
            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              NEW
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-5 space-y-5">
        {/* Basic Info */}
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 pb-2 border-b border-slate-100">
            기본 정보
          </p>
          <div className="space-y-2.5">
            <Field label="📅 가입 연도">
              {member.joinYear}년 <span className="text-slate-400 font-normal">({years}년차)</span>
            </Field>
            <Field label="🏅 배드민턴 급수">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold ${GRADE_STYLES[member.grade]}`}>
                {member.grade}
              </span>
            </Field>
            <Field label="🕐 소속 반">
              {classMeta && (
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold ${classMeta.badgeClass}`}>
                  {classMeta.emoji} {member.timeClass}
                </span>
              )}
            </Field>
            <Field label="🚗 차량 번호" value={member.car} />
          </div>
        </div>

        {/* Equipment */}
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 pb-2 border-b border-slate-100">
            장비 정보
          </p>
          <div className="space-y-2.5">
            <Field label="🏸 라켓">
              <span className="text-right leading-snug">{member.racket}</span>
            </Field>
            <Field label="🪢 스트링" value={member.string} />
            <Field label="⚡ 텐션">
              <TensionBar tension={member.tension} />
            </Field>
          </div>
        </div>
      </div>
    </div>
  )
}
