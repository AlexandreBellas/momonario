import { useWord, useWordDispatch } from '@/hooks/useWord'
import { useWordService } from '@/hooks/useWordService'
import { useCallback, useEffect, useState } from 'react'

export default function TextAreaSearchWord() {
  // #region Contexts
  const { word, meaning } = useWord()
  const wordDispatch = useWordDispatch()
  const wordService = useWordService()
  // #endregion

  // #region States
  const [meaningState, setMeaningState] = useState('')
  // #endregion

  // #region Callbacks
  const saveMeaningForCurrentWord = useCallback(() => {
    if (!word) return

    wordDispatch({ type: 'set-meaning', meaning: meaningState })
    wordService.save({ word, meaning: meaningState })
    alert('Saved!')
  }, [word, wordService, wordDispatch, meaningState])
  // #endregion

  // #region Effects

  // onChangeContextMeaning
  useEffect(() => {
    setMeaningState(meaning ?? '')
  }, [meaning])

  // onChangeContextWord
  useEffect(() => {
    if (word === undefined) return

    wordService.search({ word }).then((searchResult) => {
      setMeaningState(searchResult.meaning ?? '')
    })
  }, [word, wordService])

  // onSave
  useEffect(() => {
    function onKeyboardDown(event: KeyboardEvent) {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault()
        ;(document.activeElement as HTMLElement).blur()

        saveMeaningForCurrentWord()
      }
    }

    window.addEventListener('keydown', onKeyboardDown)

    return () => {
      window.removeEventListener('keydown', onKeyboardDown)
    }
  }, [saveMeaningForCurrentWord])
  // #endregion

  return (
    <div className="h-[50vh] flex bg-gray-400 justify-center">
      <div className="container mx-4 flex-1 flex flex-col mb-12 h-48">
        <div className="flex justify-end">
          <div className="relative">
            <button
              onClick={() => {
                if (meaningState === undefined) return
                saveMeaningForCurrentWord()
              }}
              className="absolute top-0 bottom-0 w-full opacity-0 hover:opacity-100 hover:mt-[-5rem] transition-all"
            >
              <p className="text-center bg-slate-500/50 rounded-lg">
                or Ctrl+S
              </p>
            </button>
            <div className="bg-gray-700 hover:bg-gray-700/75 text-slate-100 rounded-lg px-4 py-3 shadow-md">
              Save ✅
            </div>
          </div>
        </div>
        <textarea
          className="flex-1 bg-transparent p-4 focus:outline-none bg-white shadow-md rounded-lg mt-2"
          placeholder="Meaning or description"
          value={meaningState}
          onChange={(ev) => {
            setMeaningState(ev.target.value)
          }}
        />
      </div>
    </div>
  )
}
