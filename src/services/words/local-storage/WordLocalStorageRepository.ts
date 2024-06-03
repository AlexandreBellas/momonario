import slugify from 'slugify'
import {
  IWordGateway,
  IWordGatewaySaveRequest,
  IWordGatewaySaveResponse,
  IWordGatewaySearchRequest,
  IWordGatewaySearchResponse,
} from '../IWordGateway'

export class WordLocalStorageRepository implements IWordGateway {
  async save(
    request: IWordGatewaySaveRequest
  ): Promise<IWordGatewaySaveResponse> {
    localStorage.setItem(
      slugify(request.word, {
        lower: true,
        trim: true,
      }),
      request.meaning
    )

    return { isSuccessful: true }
  }

  async search(
    request: IWordGatewaySearchRequest
  ): Promise<IWordGatewaySearchResponse> {
    const meaning = localStorage.getItem(
      slugify(request.word, {
        lower: true,
        trim: true,
      })
    )

    return { meaning }
  }
}
