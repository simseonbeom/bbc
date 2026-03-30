import GalleryGrid from '../components/GalleryGrid'

export default function GalleryPage({ photos }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 animate-fade-up">
      <div className="mb-7">
        <h1 className="text-2xl font-black text-primary">활동 갤러리</h1>
        <p className="text-sm text-slate-500 mt-1">BBC 클럽의 생생한 활동 사진을 확인하세요.</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <GalleryGrid photos={photos} large />
      </div>
    </div>
  )
}
