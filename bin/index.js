import packageJSON from "../package.json" assert { type: "json" }
import { JuicyLogsBaseConfig } from "./config.js"
import ConfiguredLogger from "./logs/configured_logger.js"
import EventPusher from "./events/event_pusher.js"

export const version = packageJSON.version
export const packageName = packageJSON.name

export { JuicyLogsBaseConfig }
export { ConfiguredLogger as Logger }
export { EventPusher }
