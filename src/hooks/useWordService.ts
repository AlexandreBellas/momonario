import { IWordGateway } from '@/services/words/IWordGateway'
import { WordLocalStorageRepository } from '@/services/words/local-storage/WordLocalStorageRepository'
import { useMemo } from 'react'

const wordGateway = new WordLocalStorageRepository() // singleton

export function useWordService(): IWordGateway {
  return useMemo(() => wordGateway, [])
}
