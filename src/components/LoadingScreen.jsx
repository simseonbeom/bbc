export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center gap-5">
      <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg animate-pulse">
        <span className="text-2xl">🏸</span>
      </div>
      <div className="text-center">
        <p className="font-bold text-primary text-lg">BBC 배드민턴 클럽</p>
        <p className="text-slate-400 text-sm mt-1">데이터를 불러오는 중...</p>
      </div>
      <div className="flex gap-1.5 mt-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-accent animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  )
}

export function ErrorScreen({ message, onRetry }) {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center gap-5 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center shadow-sm">
        <span className="text-3xl">⚠️</span>
      </div>
      <div>
        <p className="font-bold text-slate-800 text-lg mb-1">데이터 불러오기 실패</p>
        <p className="text-slate-500 text-sm leading-relaxed max-w-sm">{message}</p>
        <p className="text-slate-400 text-xs mt-3 leading-relaxed max-w-sm">
          구글 시트가 <strong>"웹에 게시"</strong> 상태인지, Sheet ID가 올바른지 확인해주세요.
        </p>
      </div>
      <button
        onClick={onRetry}
        className="bg-primary text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-primary-light transition-colors duration-150"
      >
        다시 시도
      </button>
    </div>
  )
}
