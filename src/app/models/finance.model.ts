export type ResponseCandle = {
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

export type CandleViewModel = {
    datetime: string[],
    ohcl: number[][]
}

export type ResponseMaxMin = {
    id: number,
    price: number,
    candle: Candle
}

export type ResponseSma = {
    id: number,
    price: number,
    candle: number
}

export type MaxMinViewModel = (string | number)[][]

export type SmaViewModel = (string | number)[]