import config from "./utils/config"
import logger from "./utils/logger"

import app from "./app"

app.listen(config.PORT, () =>
  logger.info(`Started server on port: ${config.PORT}`),
)
