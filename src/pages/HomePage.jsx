import HeroSearch from '../components/HeroSearch'
import HeroSlider from '../components/HeroSlider'
import NoticeList from '../components/NoticeList'
import ActivityFeed from '../components/ActivityFeed'
import GalleryGrid from '../components/GalleryGrid'

function SectionHeader({ title, onMore }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-extrabold text-primary flex items-center gap-2">
        <span className="w-1 h-5 bg-accent rounded-full inline-block" />
        {title}
      </h2>
      {onMore && (
        <button
          onClick={onMore}
          className="text-slate-400 hover:text-accent border border-slate-200 hover:border-accent text-xs px-3 py-1.5 rounded-lg transition-all duration-150"
        >
          더보기
        </button>
      )}
    </div>
  )
}

export default function HomePage({ members, notices, activities, photos, slides, setActivePage, onOpenMember, onSearchMembers, onRefresh }) {
  const newMembers = members.filter((m) => m.isNew)

  return (
    <div className="animate-fade-up">
      {/* ── HERO ── */}
      <div className="bg-primary-dark relative overflow-hidden">
        <HeroSlider slides={slides} />

        <div className="relative z-10 max-w-2xl mx-auto px-6 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 text-accent text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest">
            🏸 BBC BADMINTON CLUB
          </div>
          <h1 className="text-white font-black text-3xl sm:text-5xl leading-tight mb-3 tracking-tight">
            함께 날아오르는<br />
            <span className="text-accent">BBC</span> 배드민턴 클럽
          </h1>
          <p className="text-white/60 text-sm sm:text-base mb-8 leading-relaxed">
            회원 정보 조회, 클럽 소식, 활동 사진까지<br className="hidden sm:block" />
            BBC의 모든 것을 한 곳에서 확인하세요.
          </p>

          <HeroSearch
            members={members}
            onSelectMember={onOpenMember}
            onGoToMembers={onSearchMembers}
          />

          <div className="flex justify-center gap-8 sm:gap-12 mt-10">
            {[
              { num: members.length, label: '전체 회원' },
              { num: 7,              label: '이번 달 활동' },
              { num: newMembers.length, label: '신규 가입' },
              { num: 5,              label: '운영 연차' },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div className="text-accent font-black text-2xl sm:text-3xl leading-none">{num}</div>
                <div className="text-white/50 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
        {/* New members strip */}
        {newMembers.length > 0 && (
          <div className="flex items-center gap-3 flex-wrap bg-accent/8 border border-accent/20 rounded-xl px-5 py-3">
            <span className="bg-accent/15 text-accent text-xs font-bold px-2.5 py-1 rounded-md whitespace-nowrap">
              🎉 신규 회원
            </span>
            <div className="flex gap-2 flex-wrap">
              {newMembers.map((m) => (
                <button
                  key={m.id}
                  onClick={() => onOpenMember(m.id)}
                  className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:border-accent hover:text-accent text-sm font-semibold px-3 py-1 rounded-full transition-all duration-150"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  {m.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <SectionHeader title="최근 소식" onMore={() => setActivePage('notice')} />
            <NoticeList
              notices={notices.slice(0, 5)}
              onOpen={() => setActivePage('notice')}
              compact
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <SectionHeader title="클럽 활동" />
            <ActivityFeed activities={activities} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <SectionHeader title="활동 사진" onMore={() => setActivePage('gallery')} />
          <GalleryGrid photos={photos} limit={6} />
        </div>

        {/* 새로고침 버튼 (시트 수정 후 반영) */}
        <div className="text-center">
          <button
            onClick={onRefresh}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-primary text-xs border border-slate-200 hover:border-primary/30 px-4 py-2 rounded-lg transition-all duration-150"
          >
            🔄 데이터 새로고침
          </button>
        </div>
      </div>
    </div>
  )
}
