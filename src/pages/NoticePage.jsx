import { useState } from 'react'
import NoticeList from '../components/NoticeList'
import NoticeModal from '../components/NoticeModal'

export default function NoticePage({ notices }) {
  const [openNotice, setOpenNotice] = useState(null)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 animate-fade-up">
      <div className="mb-7">
        <h1 className="text-2xl font-black text-primary">공지사항</h1>
        <p className="text-sm text-slate-500 mt-1">BBC 클럽의 중요 공지 및 소식을 확인하세요.</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <NoticeList notices={notices} onOpen={setOpenNotice} />
      </div>
      <NoticeModal notice={openNotice} onClose={() => setOpenNotice(null)} />
    </div>
  )
}
