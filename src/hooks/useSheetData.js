import { useState, useEffect } from 'react'
import { fetchAllData } from '../lib/sheets'

export function useSheetData() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAllData()
      .then(setData)
      .catch((err) => {
        console.error('[useSheetData]', err)
        setError(err.message ?? '데이터를 불러오지 못했습니다.')
      })
      .finally(() => setLoading(false))
  }, [])

  // 수동 새로고침 (관리자가 시트 수정 후 반영하고 싶을 때)
  function refresh() {
    setLoading(true)
    setError(null)
    fetchAllData()
      .then(setData)
      .catch((err) => setError(err.message ?? '데이터를 불러오지 못했습니다.'))
      .finally(() => setLoading(false))
  }

  return { data, loading, error, refresh }
}
