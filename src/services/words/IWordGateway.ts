export interface IWordDefinition {
  meaning: string
  labels: string[]
}

export interface IWords {
  [word: string]: IWordDefinition | undefined
}

export interface IExportData {
  words: IWords
}

export interface IWordGatewayFindRequest {
  word: string
}

export interface IWordGatewayFindResponse {
  definition?: IWordDefinition | null
}

export interface IWordGatewaySaveRequest {
  word: string
  definition: IWordDefinition
}

export interface IWordGatewaySaveResponse {
  isSuccessful: boolean
}

export interface IWordGatewayExportResponse {
  data: string
}

export interface IWordGatewayImportRequest {
  data: string
}

export type IWordGatewayImportResponse =
  | {
      isSuccessful: true
    }
  | {
      isSuccessful: false
      message: string
    }

export interface IWordGateway {
  find: (request: IWordGatewayFindRequest) => Promise<IWordGatewayFindResponse>
  save: (request: IWordGatewaySaveRequest) => Promise<IWordGatewaySaveResponse>
  export: () => Promise<IWordGatewayExportResponse>
  import: (
    request: IWordGatewayImportRequest
  ) => Promise<IWordGatewayImportResponse>
}
