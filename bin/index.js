import packageJSON from "../package.json" assert { type: "json" }
import ConfiguredLogger from "./configured_logger.js"
import EventPusher from "./events/event_pusher.js"

export const version = packageJSON.version
export const packageName = packageJSON.name
export { ConfiguredLogger as Logger }
export { EventPusher }