import { IWordGateway } from '@/services/words/IWordGateway'
import { WordLocalStorageRepository } from '@/services/words/local-storage/WordLocalStorageRepository'
import { useMemo } from 'react'

export function useWordService(): IWordGateway {
  return useMemo(() => new WordLocalStorageRepository(), [])
}
