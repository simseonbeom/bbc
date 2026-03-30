import {
  MEMBERS as FALLBACK_MEMBERS,
  NOTICES as FALLBACK_NOTICES,
  ACTIVITIES as FALLBACK_ACTIVITIES,
  PHOTOS as FALLBACK_PHOTOS,
} from '../data/data'

const BASE  = import.meta.env.VITE_SHEET_BASE
const GIDS  = {
  members:    import.meta.env.VITE_GID_MEMBERS    ?? '0',
  notices:    import.meta.env.VITE_GID_NOTICES,
  activities: import.meta.env.VITE_GID_ACTIVITIES,
  photos:     import.meta.env.VITE_GID_PHOTOS,
  slides:     import.meta.env.VITE_GID_SLIDES,
}

function csvUrl(gid) {
  // gid가 '0' 또는 빈 값이면 기본 탭 (첫 번째 탭)
  const gidParam = gid && gid !== '0' ? `&gid=${gid}` : ''
  return `${BASE}?output=csv${gidParam}`
}

// ── CSV 파서 ─────────────────────────────────────────────
function parseCSV(text) {
  const result = []
  let row = [], field = '', inQuotes = false

  for (let i = 0; i <= text.length; i++) {
    const ch = text[i]
    if (i === text.length) {
      if (field || row.length > 0) { row.push(field); result.push(row) }
      break
    }
    if (ch === '"') {
      if (!inQuotes) { inQuotes = true }
      else if (text[i + 1] === '"') { field += '"'; i++ }
      else { inQuotes = false }
    } else if (ch === ',' && !inQuotes) {
      row.push(field); field = ''
    } else if (ch === '\r' && text[i + 1] === '\n' && !inQuotes) {
      row.push(field); field = ''; result.push(row); row = []; i++
    } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
      row.push(field); field = ''; result.push(row); row = []
    } else {
      field += ch
    }
  }
  return result
}

function toObjects(rows) {
  if (rows.length < 2) return []
  const headers = rows[0].map((h) => h.trim())
  return rows.slice(1)
    .filter((row) => row.some((c) => c.trim() !== ''))
    .map((row) => {
      const obj = {}
      headers.forEach((h, i) => { obj[h] = (row[i] ?? '').trim() })
      return obj
    })
}

// ── 각 탭 변환 ───────────────────────────────────────────

function transformMembers(rows) {
  return toObjects(rows).map((r) => ({
    id:        Number(r.id),
    name:      r.name,
    joinYear:  Number(r.joinYear),
    grade:     r.grade,
    timeClass: r.timeClass,
    racket:    r.racket,
    string:    r.string,
    tension:   Number(r.tension),
    car:       r.car,
    isNew:     r.isNew === 'TRUE' || r.isNew === 'true' || r.isNew === '1',
  }))
}

function transformNotices(rows) {
  return toObjects(rows).map((r) => ({
    id:      Number(r.id),
    type:    r.type,
    title:   r.title,
    date:    r.date,
    author:  r.author,
    content: r.content,
  }))
}

function transformActivities(rows) {
  return toObjects(rows).map((r) => ({
    icon: r.icon,
    type: r.type,
    text: r.text,
    time: r.time,
  }))
}

function transformPhotos(rows) {
  return toObjects(rows).map((r) => ({
    label:    r.label,
    emoji:    r.emoji,
    gradient: r.gradient,
  }))
}

// 구글 드라이브 공유 URL → 직접 표시 가능한 URL로 변환
// https://drive.google.com/file/d/{ID}/view  →  https://lh3.googleusercontent.com/d/{ID}
function toDriveImageUrl(url) {
  if (!url) return url
  const match = url.match(/\/file\/d\/([^/]+)/)
  if (match) return `https://lh3.googleusercontent.com/d/${match[1]}`
  return url
}

function transformSlides(rows) {
  return toObjects(rows).map((r) => ({
    imageUrl: toDriveImageUrl(r.imageUrl),
    label:    r.label ?? '',
  }))
}

// ── 단일 탭 fetch ─────────────────────────────────────────
async function fetchSheet(key) {
  const gid = GIDS[key]
  const url = csvUrl(gid)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const text = await res.text()
  if (text.trim().startsWith('<!')) throw new Error(`탭을 읽을 수 없습니다 (gid=${gid})`)
  return parseCSV(text)
}

// ── 전체 데이터 fetch ─────────────────────────────────────
export async function fetchAllData() {
  if (!BASE) {
    console.warn('[sheets] VITE_SHEET_BASE 미설정 → 샘플 데이터 사용')
    return { members: FALLBACK_MEMBERS, notices: FALLBACK_NOTICES, activities: FALLBACK_ACTIVITIES, photos: FALLBACK_PHOTOS }
  }

  const [mRes, nRes, aRes, pRes, sRes] = await Promise.allSettled([
    fetchSheet('members'),
    fetchSheet('notices'),
    fetchSheet('activities'),
    fetchSheet('photos'),
    GIDS.slides ? fetchSheet('slides') : Promise.reject('GID 미설정'),
  ])

  function resolve(res, transform, fallback, name) {
    if (res.status === 'fulfilled') return transform(res.value)
    console.warn(`[sheets] "${name}" 실패 → 샘플 사용`, res.reason)
    return fallback
  }

  return {
    members:    resolve(mRes, transformMembers,    FALLBACK_MEMBERS,    'members'),
    notices:    resolve(nRes, transformNotices,    FALLBACK_NOTICES,    'notices'),
    activities: resolve(aRes, transformActivities, FALLBACK_ACTIVITIES, 'activities'),
    photos:     resolve(pRes, transformPhotos,     FALLBACK_PHOTOS,     'photos'),
    slides:     sRes.status === 'fulfilled' ? transformSlides(sRes.value) : [],
  }
}
