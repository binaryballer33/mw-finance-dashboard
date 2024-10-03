import { Trade } from "src/types/trades/trade"

type StatusSuccess = 200 | 201

type StatusClientError = 400 | 403 | 404

type StatusServerError = 500 | 503

type ServerSuccessResponse = {
    status: StatusSuccess
    success: string
}

type ServerTradesSuccessResponse = {
    status: StatusSuccess
    success: string
    trades: Trade[]
}

type ServerErrorResponse = {
    error: string
    status: StatusClientError | StatusServerError
}

export type ServerResponse =
    | ServerErrorResponse
    | ServerSuccessResponse
    | ServerTradesSuccessResponse
