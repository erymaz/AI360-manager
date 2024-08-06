export const withCurrency = (value: number, currency = 'EUR', region = 'de-DE'): string => {
  return new Intl.NumberFormat(region, { style: 'currency', currency }).format(value);
}

export const threeCommaDecimals = (value: number): string => {
  return new Intl.NumberFormat(undefined).format(value);
}

export const countryFlagEmoji = (code: string): string => {
  if (!code) {
    return "";
  }
  const isWindow = navigator?.appVersion?.includes("Win") || false;
  if (isWindow) {
    return `<img
      width="100%"
      src="https://flagcdn.com/48x36/${code.toLowerCase()}.png"
    />`
  }
  return code.toUpperCase().replace(/./g, char =>
    String.fromCodePoint(127397 + char.charCodeAt(0)),
  )
}

export const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))
