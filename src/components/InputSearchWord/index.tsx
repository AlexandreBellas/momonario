import { useWord, useWordDispatch } from '@/hooks/useWord'
import { useCallback } from 'react'
import ButtonExportDictionary from '../ButtonExportDictionary'
import ButtonImportDictionary from '../ButtonImportDictionary'

export default function InputSearchWord() {
  // #region Contexts
  const { word } = useWord()
  const wordDispatch = useWordDispatch()
  // #endregion

  // #region Callbacks
  const onChangeWord = useCallback(
    (search: string) => {
      wordDispatch({ type: 'set-word', word: search })
    },
    [wordDispatch],
  )
  // #endregion

  return (
    <div className="flex h-[50vh] flex-col items-center justify-center bg-gradient-to-b from-gray-200 to-gray-400">
      <div className="container m-4 flex justify-end">
        <ButtonImportDictionary />
        <ButtonExportDictionary />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="flex h-16 rounded-full bg-white px-5 py-4 shadow-md md:h-12">
          <input
            className="w-[40vw] flex-1 bg-transparent focus:outline-none"
            placeholder="Type to add or search..."
            value={word ?? ''}
            onChange={(ev) => onChangeWord(ev.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
