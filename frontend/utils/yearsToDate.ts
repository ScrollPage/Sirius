export const yearsToDate = (years: number) => {
  const year = new Date().getFullYear() - years
  return `${year}-01-01`
}