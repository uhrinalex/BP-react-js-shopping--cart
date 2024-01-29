const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "EUR",
    style: "currency",
})

/** @param number {number}  */
export function formatCurrency(number){
    return CURRENCY_FORMATTER.format(number)
}