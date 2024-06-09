import { useWordDispatch } from '@/hooks/useWord'
import { useWordService } from '@/hooks/useWordService'
import { ArrowUpFromLine } from 'lucide-react'
import { ChangeEvent, useCallback } from 'react'

export default function ButtonImportDictionary() {
  // #region Contexts
  const wordDispatch = useWordDispatch()
  // #endregion

  // #region Services
  const wordService = useWordService()
  // #endregion

  // #region Callbacks
  const onImport = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) {
        alert('No dictionary has been added.')
        return
      }

      const reader = new FileReader()
      reader.onload = function (event) {
        const eventTarget = event.target
        if (!eventTarget?.result || typeof eventTarget.result !== 'string') {
          alert('It has not been possible to read the dictionary.')
          return
        }

        wordService
          .import({ data: eventTarget.result })
          .then((importResponse) => {
            if (!importResponse.isSuccessful) {
              alert(importResponse.message)
              return
            }

            wordDispatch({ type: 'clear' })
            alert('New dictionary imported successfully.')
          })
      }

      reader.readAsText(file)
    },
    [wordService, wordDispatch],
  )
  // #endregion

  return (
    <div className="my-2 rounded-lg p-2 hover:bg-gray-300">
      <label htmlFor="input--import-data">
        <ArrowUpFromLine className="text-gray-500" />
      </label>
      <input
        id="input--import-data"
        type="file"
        className="hidden"
        accept="text/plain"
        onChange={(ev) => {
          onImport(ev)
        }}
      ></input>
    </div>
  )
}
