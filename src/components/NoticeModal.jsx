import { useEffect } from 'react'

const TYPE_STYLES = {
  new:   'bg-red-500 text-white',
  event: 'bg-accent text-primary',
  공지:  'bg-primary text-white',
}
const TYPE_LABELS = { new: 'NEW', event: '이벤트', 공지: '공지' }

export default function NoticeModal({ notice, onClose }) {
  useEffect(() => {
    if (notice) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [notice])

  if (!notice) return null

  return (
    <div
      className="fixed inset-0 bg-black/55 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
          <h2 className="font-extrabold text-primary text-lg leading-snug pr-4">{notice.title}</h2>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-500 text-slate-500 transition-colors duration-150"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-7 py-6">
          <div className="flex items-center gap-3 pb-5 mb-5 border-b border-slate-100">
            <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${TYPE_STYLES[notice.type] ?? 'bg-slate-200 text-slate-600'}`}>
              {TYPE_LABELS[notice.type] ?? notice.type}
            </span>
            <span className="text-sm text-slate-400">📅 {notice.date}</span>
            <span className="text-sm text-slate-400">✍️ {notice.author}</span>
          </div>
          <p className="text-sm leading-[1.85] text-slate-700 whitespace-pre-line">
            {notice.content}
          </p>
        </div>
      </div>
    </div>
  )
}
