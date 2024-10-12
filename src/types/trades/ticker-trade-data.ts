/*
 * ticker - the ticker symbol of the underlying security
 * total - the total amount of money you made from this symbol all time
 * tradeCount = the total amount of trades made from this symbol all time
 */
export type TickerTradeData = {
    /* the ticker symbol of the underlying security */
    ticker: string

    /* the total amount of money you made from this symbol all time  */
    total: number

    /* the total amount of trades made from this symbol all time  */
    tradeCount: number
}
