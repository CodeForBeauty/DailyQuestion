export const getQuestionNum = (): number => {
  const today = new Date()
  const utc = new Date(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate(),
  )
  const dateNum = utc.getTime()
  return dateNum
}

export const getDateNum = (date: Date): number => {
  const utc = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
  )
  const dateNum = utc.getTime()
  return dateNum
}
