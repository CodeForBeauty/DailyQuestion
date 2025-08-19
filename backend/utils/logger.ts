import config from "./config"

const info = (message: any) => {
  if (config.EXEC_ENV !== "test") {
    console.log(message)
  }
}

const error = (message: any) => {
  console.error(message)
}

export default { info, error }
