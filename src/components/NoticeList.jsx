const TYPE_STYLES = {
  new:   'bg-red-500 text-white',
  event: 'bg-accent text-primary',
  공지:  'bg-primary text-white',
}
const TYPE_LABELS = { new: 'NEW', event: '이벤트', 공지: '공지' }

export default function NoticeList({ notices, onOpen, compact = false }) {
  return (
    <ul className="divide-y divide-slate-100">
      {notices.map((n) => (
        <li
          key={n.id}
          onClick={() => onOpen(n)}
          className={`flex items-start gap-3 cursor-pointer hover:bg-slate-50 transition-colors duration-150 group ${compact ? 'py-3.5' : 'py-4 px-7'}`}
        >
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold flex-shrink-0 mt-0.5 ${TYPE_STYLES[n.type] ?? 'bg-slate-200 text-slate-600'}`}>
            {TYPE_LABELS[n.type] ?? n.type}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 group-hover:text-primary transition-colors duration-150 truncate">
              {n.title}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">{n.date} · {n.author}</p>
          </div>
          {!compact && (
            <span className="text-slate-300 text-xl flex-shrink-0 self-center">›</span>
          )}
        </li>
      ))}
    </ul>
  )
}
