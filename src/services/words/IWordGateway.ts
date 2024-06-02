export interface IWordGatewaySearchRequest {
  word: string;
}

export interface IWordGatewaySearchResponse {
  meaning?: string | null;
}

export interface IWordGatewaySaveRequest {
  word: string;
  meaning: string;
}

export interface IWordGatewaySaveResponse {
  isSuccessful: boolean;
}

export interface IWordGateway {
  search: (
    request: IWordGatewaySearchRequest
  ) => Promise<IWordGatewaySearchResponse>;
  save: (request: IWordGatewaySaveRequest) => Promise<IWordGatewaySaveResponse>;
}
