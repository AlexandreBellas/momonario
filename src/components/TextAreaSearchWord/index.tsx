import { useWord, useWordDispatch } from '@/hooks/useWord'
import { useWordService } from '@/hooks/useWordService'
import { useCallback, useEffect, useState } from 'react'
import { BrowserView } from 'react-device-detect'

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
    if (meaningState === undefined) return

    wordDispatch({ type: 'set-meaning', meaning: meaningState })
    wordService
      .save({
        word,
        definition: { meaning: meaningState, labels: [] },
      })
      .then((saveResponse) => {
        if (saveResponse.isSuccessful) {
          alert('Saved!')
        } else {
          alert('Could not save the word.')
        }
      })
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

    wordService.find({ word }).then((findResult) => {
      setMeaningState(findResult.definition?.meaning ?? '')
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
    <div className="flex h-[50vh] justify-center bg-gray-400">
      <div className="container mx-4 mb-12 flex h-48 flex-1 flex-col">
        <div className="flex justify-end">
          <div className="relative">
            <BrowserView>
              <button
                onClick={() => {
                  saveMeaningForCurrentWord()
                }}
                className="absolute bottom-0 top-0 w-full opacity-0 transition-all hover:mt-[-5rem] hover:opacity-100"
              >
                <p className="rounded-lg bg-slate-500/50 text-center">
                  or Ctrl+S
                </p>
              </button>
            </BrowserView>
            <button
              className="rounded-lg bg-gray-700 px-4 py-3 text-slate-100 shadow-md hover:bg-gray-700/75"
              onClick={() => {
                saveMeaningForCurrentWord()
              }}
            >
              Save ✅
            </button>
          </div>
        </div>
        <textarea
          className="mt-2 flex-1 rounded-lg bg-transparent bg-white p-4 shadow-md focus:outline-none"
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
