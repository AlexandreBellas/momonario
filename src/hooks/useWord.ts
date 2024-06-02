import { WordContext, WordContextDispatch } from '@/contexts/WordProvider'
import { useContext } from 'react'

export function useWord() {
  return useContext(WordContext)
}

export function useWordDispatch() {
  return useContext(WordContextDispatch)
}
