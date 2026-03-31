import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import { LoadingScreen, ErrorScreen } from './components/LoadingScreen'
import { useSheetData } from './hooks/useSheetData'
import HomePage from './pages/HomePage'
import MembersPage from './pages/MembersPage'
import GalleryPage from './pages/GalleryPage'
import NoticePage from './pages/NoticePage'

const VALID_PAGES = ['home', 'members', 'gallery', 'notice']

function getPageFromHash() {
  const hash = location.hash.replace('#', '')
  return VALID_PAGES.includes(hash) ? hash : 'home'
}

export default function App() {
  const { data, loading, error, refresh } = useSheetData()
  const [activePage, setActivePage] = useState(getPageFromHash)
  const [pendingMemberId, setPendingMemberId] = useState(null)

  // 뒤로가기 / 앞으로가기 → hash 변경 감지해서 페이지 전환
  useEffect(() => {
    const handler = () => setActivePage(getPageFromHash())
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [])

  // 페이지 이동 시 URL hash + 브라우저 히스토리에 기록
  function navigate(page) {
    const hash = page === 'home' ? '' : `#${page}`
    history.pushState({ page }, '', hash || location.pathname + location.search)
    setActivePage(page)
  }

  function openMember(id) {
    setPendingMemberId(id)
    navigate('members')
  }

  if (loading) return <LoadingScreen />
  if (error)   return <ErrorScreen message={error} onRetry={refresh} />

  return (
    <div className="min-h-screen bg-slate-100">
      <Nav activePage={activePage} setActivePage={navigate} />

      {activePage === 'home' && (
        <HomePage
          members={data.members}
          notices={data.notices}
          activities={data.activities}
          photos={data.photos}
          slides={data.slides}
          setActivePage={navigate}
          onOpenMember={openMember}
          onRefresh={refresh}
        />
      )}
      {activePage === 'members' && (
        <MembersPage
          members={data.members}
          initialSelectedId={pendingMemberId}
          onClearInitial={() => setPendingMemberId(null)}
        />
      )}
      {activePage === 'gallery' && (
        <GalleryPage photos={data.photos} />
      )}
      {activePage === 'notice' && (
        <NoticePage notices={data.notices} />
      )}
    </div>
  )
}
