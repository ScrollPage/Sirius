export const yearsToDate = (years: string | undefined) => {
  if (!years) {
    return
  }
  const year = new Date().getFullYear() - Number(years)
  return `${year}-01-01`
}
