import { useWordService } from '@/hooks/useWordService'
import { ArrowDownToLine } from 'lucide-react'
import { useCallback } from 'react'

export default function ButtonExportDictionary() {
  // #region Services
  const wordService = useWordService()
  // #endregion

  // #region Callbacks
  const onExport = useCallback(() => {
    wordService.export().then((exportResponse) => {
      const element = document.createElement('a')
      const file = new Blob([exportResponse.data], { type: 'text/plain' })
      element.href = URL.createObjectURL(file)
      element.download = `${new Date().toISOString()}+export.txt`
      document.body.appendChild(element)
      element.click()
    })
  }, [wordService])

  // #endregion

  return (
    <button
      className="my-2 rounded-lg bg-white p-2 hover:bg-white/50"
      onClick={() => {
        onExport()
      }}
    >
      <ArrowDownToLine className="text-gray-800" />
    </button>
  )
}
