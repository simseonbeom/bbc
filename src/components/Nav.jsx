export default function Nav({ activePage, setActivePage }) {
  const tabs = [
    { id: 'home',    label: '홈' },
    { id: 'members', label: '회원 관리' },
    { id: 'gallery', label: '갤러리' },
    { id: 'notice',  label: '공지사항' },
  ]

  return (
    <nav className="bg-primary sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4 sm:gap-8">
        {/* Logo */}
        <button
          onClick={() => setActivePage('home')}
          className="flex items-center gap-2 flex-shrink-0"
        >
          <span className="bg-accent text-primary font-black text-sm px-2.5 py-1 rounded-md tracking-widest">
            BBC
          </span>
          <span className="text-white font-bold text-base hidden sm:block tracking-tight">
            배드민턴 클럽
          </span>
        </button>

        {/* Tabs */}
        <div className="flex gap-1 flex-1 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActivePage(tab.id)}
              className={`
                whitespace-nowrap px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150
                ${activePage === tab.id
                  ? 'bg-accent/15 text-accent font-bold'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Admin */}
        <button className="hidden sm:flex items-center gap-1.5 text-white/70 hover:text-white border border-white/20 hover:bg-white/10 px-3 py-1.5 rounded-lg text-sm transition-all duration-150 flex-shrink-0">
          ⚙ 관리자
        </button>
      </div>
    </nav>
  )
}
