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
  const saveMeaningForCurrentWord = useCallback(
    (newMeaning: string) => {
      if (!word) return

      wordDispatch({ type: 'set-meaning', meaning: newMeaning })
      wordService.save({ word, meaning: newMeaning })
    },
    [word, wordService, wordDispatch]
  )
  // #endregion

  // #region Effects
  useEffect(() => {
    console.log('effect meaning')
    setMeaningState(meaning ?? '')
  }, [meaning])

  useEffect(() => {
    console.log('effect word wordService')
    if (word === undefined) return

    wordService.search({ word }).then((searchResult) => {
      setMeaningState(searchResult.meaning ?? '')
    })
  }, [word, wordService])
  // #endregion

  return (
    <div className="h-[50vh] flex bg-gray-400 justify-center">
      <div className="container mx-4 flex-1 flex flex-col mb-12 h-48">
        <div className="flex items-center justify-center">
          <button
            className="bg-lime-700 text-white rounded-lg px-4 py-3 shadow-md"
            onClick={() => {
              if (meaningState === undefined) return
              saveMeaningForCurrentWord(meaningState)
            }}
          >
            Save ✅
          </button>
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
