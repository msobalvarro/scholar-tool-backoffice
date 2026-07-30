
export const FormatCurrency = (amount: number, currency: string = 'NIO', locale: string = 'es-NI') =>
  Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount)


export const FormatCurrencyDollar = (amount: number) =>
  `$${amount}`
