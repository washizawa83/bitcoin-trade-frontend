export type OriginCandle = {
    id: number,
} & Candle

export type Candle = {
    datetime: string,
    open: number,
    high: number,
    low: number,
    close: number
}

export type CandleDrawList = (Candle[keyof Candle])[];