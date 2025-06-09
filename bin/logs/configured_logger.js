import { HttpConfig } from '../config.js'
import Logger from './logger.js'

export default class ConfiguredLogger extends Logger {
  constructor(httpConfigOverrides, appConfigOverrides = {}) {
    super(appConfigOverrides)

    this.httpConfig = new HttpConfig(httpConfigOverrides)
  }

  async error(...args) {
    if (!this.httpConfig.log_error) return
    return await super.error(...args)
  }

  async info(...args) {
    if (!this.httpConfig.log_info) return
    return await super.info(...args)
  }

  async debug(...args) {
    if (!this.httpConfig.log_debug) return
    return await super.debug(...args)
  }

  async warn(...args) {
    if (!this.httpConfig.log_warn) return
    return await super.warn(...args)
  }
}