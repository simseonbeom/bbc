const TYPE_STYLES = {
  join:  'bg-accent/10',
  score: 'bg-amber-50',
  event: 'bg-primary/10',
}

export default function ActivityFeed({ activities }) {
  return (
    <div className="flex flex-col divide-y divide-slate-100">
      {activities.map((a, i) => (
        <div key={i} className="flex gap-3.5 py-3 first:pt-0 last:pb-0 items-start">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 ${TYPE_STYLES[a.type] ?? 'bg-slate-100'}`}>
            {a.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-sm leading-relaxed text-slate-700"
              dangerouslySetInnerHTML={{ __html: a.text }}
            />
            <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
