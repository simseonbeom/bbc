export default function GalleryGrid({ photos, limit, large = false }) {
  const items = limit ? photos.slice(0, limit) : photos

  return (
    <div className={`grid gap-3 ${large ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4' : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6'}`}>
      {items.map((photo, i) => (
        <div
          key={i}
          className="aspect-square rounded-xl overflow-hidden relative cursor-pointer group"
        >
          <div className={`w-full h-full bg-gradient-to-br ${photo.gradient} flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
            <span className={large ? 'text-5xl' : 'text-3xl'}>{photo.emoji}</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5">
            <span className="text-white text-xs font-semibold leading-tight">{photo.label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
