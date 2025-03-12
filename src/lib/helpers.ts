export function formatNumber(
  number: number,
  locale: string = navigator.language,
): string {
  return new Intl.NumberFormat(locale, {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
}
