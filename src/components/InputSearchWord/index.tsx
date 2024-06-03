import { useWordDispatch } from '@/hooks/useWord'
import { useCallback } from 'react'

export default function InputSearchWord() {
  // #region Contexts
  const wordDispatch = useWordDispatch()
  // #endregion

  // #region State

  // #endregion

  // #region Callbacks
  const onChangeWord = useCallback(
    (search: string) => {
      wordDispatch({ type: 'set-word', word: search })
    },
    [wordDispatch]
  )
  // #endregion

  return (
    <div className="h-[50vh] justify-center items-center bg-gradient-to-b from-gray-200 to-gray-400 flex">
      <div className="rounded-full flex h-16 md:h-12 py-4 px-5 bg-white shadow-md">
        <input
          className="flex-1 w-[40vw] bg-transparent focus:outline-none"
          placeholder="Type to add or search..."
          onChange={(ev) => onChangeWord(ev.target.value)}
        />
      </div>
    </div>
  )
}
