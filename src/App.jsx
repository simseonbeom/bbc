import { useState } from 'react'
import Nav from './components/Nav'
import { LoadingScreen, ErrorScreen } from './components/LoadingScreen'
import { useSheetData } from './hooks/useSheetData'
import HomePage from './pages/HomePage'
import MembersPage from './pages/MembersPage'
import GalleryPage from './pages/GalleryPage'
import NoticePage from './pages/NoticePage'

export default function App() {
  const { data, loading, error, refresh } = useSheetData()
  const [activePage, setActivePage] = useState('home')
  const [pendingMemberId, setPendingMemberId] = useState(null)

  if (loading) return <LoadingScreen />
  if (error)   return <ErrorScreen message={error} onRetry={refresh} />

  function openMember(id) {
    setPendingMemberId(id)
    setActivePage('members')
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Nav activePage={activePage} setActivePage={setActivePage} />

      {activePage === 'home' && (
        <HomePage
          members={data.members}
          notices={data.notices}
          activities={data.activities}
          photos={data.photos}
          slides={data.slides}
          setActivePage={setActivePage}
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
