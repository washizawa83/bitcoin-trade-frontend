export type navItemTypes = 'トレード'| '分析'| '損益' | '履歴' | '設定'

export const navItems: {[key: string]: navItemTypes} = {
    trade: 'トレード',
    analysis: '分析',
    profitAndLoss: '損益',
    history: '履歴',
    settings: '設定'
}