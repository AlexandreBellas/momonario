import { IWordGateway } from '@/services/words/IWordGateway'
import { WordLocalStorageRepository } from '@/services/words/local-storage/WordLocalStorageRepository'

export function useWordService(): IWordGateway {
  return new WordLocalStorageRepository()
}
