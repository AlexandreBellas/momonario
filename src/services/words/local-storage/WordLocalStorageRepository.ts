import { slugify } from '@/utils/slugify'
import {
  IWordGateway,
  IWordGatewaySaveRequest,
  IWordGatewaySaveResponse,
  IWordGatewayFindRequest,
  IWordGatewayFindResponse,
  IWordDefinition,
  IWords,
  IWordGatewayExportResponse,
  IWordGatewayImportRequest,
  IWordGatewayImportResponse,
  IExportData,
} from '../IWordGateway'

export class WordLocalStorageRepository implements IWordGateway {
  private wordsKey: string = 'words'

  async save(
    request: IWordGatewaySaveRequest
  ): Promise<IWordGatewaySaveResponse> {
    const newWord: IWordDefinition = {
      meaning: request.definition.meaning,
      labels: request.definition.labels,
    }

    let payload: IWords = {}
    const rawWords = localStorage.getItem(this.wordsKey)
    if (!rawWords) {
      payload = {
        [slugify(request.word)]: newWord,
      }
    } else {
      const words = JSON.parse(rawWords) as IWords
      payload = {
        ...words,
        [slugify(request.word)]: newWord,
      }
    }

    localStorage.setItem(this.wordsKey, JSON.stringify(payload))

    return { isSuccessful: true }
  }

  async find(
    request: IWordGatewayFindRequest
  ): Promise<IWordGatewayFindResponse> {
    const rawWords = localStorage.getItem(this.wordsKey)
    if (rawWords === null) return {}

    const words = JSON.parse(rawWords) as IWords
    const wordDefinition = words[slugify(request.word)]

    if (!wordDefinition) return {}

    return { definition: wordDefinition }
  }

  async export(): Promise<IWordGatewayExportResponse> {
    const rawWords = localStorage.getItem(this.wordsKey)
    const words: IWords =
      rawWords === null ? {} : (JSON.parse(rawWords) as IWords)

    const exportData: IExportData = {
      words,
    }

    return {
      data: JSON.stringify(exportData),
    }
  }

  async import(
    request: IWordGatewayImportRequest
  ): Promise<IWordGatewayImportResponse> {
    try {
      const rawData = JSON.parse(request.data) as IExportData

      localStorage.setItem(this.wordsKey, JSON.stringify(rawData.words))

      return { isSuccessful: true }
    } catch (e) {
      const message =
        e instanceof SyntaxError
          ? 'The imported file is not in a valid format.'
          : 'Could not import file.'

      return { isSuccessful: false, message }
    }
  }
}
