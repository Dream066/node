const currentDateTime = () => {
  const date = new Date

  const month = String(date.getMonth()).length === 1 ? "0" + (+date.getMonth() + 1) : date.getMonth()
  const day = String(date.getDate()).length === 1 ? '0' + date.getDate() : date.getDate()

  const minutes = String(date.getMinutes()).length === 1 ? '0' + date.getMinutes() : date.getMinutes()
  const seconds = String(date.getSeconds()).length === 1 ? '0' + date.getSeconds() : date.getSeconds()

  let currentDateTime = {}

  currentDateTime.date = `${date.getFullYear()}-${month}-${day}`
  currentDateTime.time = `${+date.getHours()}-${minutes}-${seconds}`

  return currentDateTime
}

module.exports = () => currentDateTime()
