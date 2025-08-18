export const getQuestionNum = (): number => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dateNum = today.getTime()
  return dateNum
}
