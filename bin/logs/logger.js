import { JuicyLogsBaseConfig } from '../config.js'

const ERROR_PREFIX = 'JUICY_LOGS: Error sending log:'

function addLogLevelToPayload(payload, level) {
  if (typeof payload === 'string') {
    return { message: payload, level }
  } else if (typeof payload === 'object') {
    return { ...payload, level }
  } else {
    return { message: 'No message provided', level }
  }
}

class Log {
  constructor(data, source, config = {}) {
    if (typeof data === 'string') {
      this.message = data
    } else if (typeof data === 'object') {
      this.message = data?.message ?? "No message provided"
      this.level = data?.level ?? "INFO"
      Object.assign(this, data)
    } else {
      this.message = "No message provided"
      this.level = "INFO"
    }
    this.source = source

    const { juicy_logs_version, juicy_logs_package } = config
    if (juicy_logs_package)
      this.juicy_logs_package = juicy_logs_package
    if (juicy_logs_version)
      this.juicy_logs_version = juicy_logs_version
  }
}

export default class Logger {
  baseConfigClass = JuicyLogsBaseConfig
  constructor(configOverrides) {
    this.config = new this.baseConfigClass(configOverrides)
  }

  static async sendLog(config, data) {
    if (!config) return
    const { token, url, source } = config

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }

    const body = JSON.stringify(new Log(data, source, config))

    if (config.console) {
      console.log(data)
    }

    try {
      const response = await fetch(`${url}/api/logs`, {
        method: 'POST',
        headers,
        body
      })

      if (!response.ok) {
        console.error(ERROR_PREFIX, response.statusText)
      }
    } catch (error) {
      console.error(ERROR_PREFIX, error)
    }
  }

  static async log(messageOrData, config) {
    return await new Logger(config).log(messageOrData)
  }

  async log(messageOrData) {
    return await Logger.sendLog(this.config, messageOrData)
  }

  static async error(messageOrData, config) {
    return await new Logger(config).error(messageOrData)
  }

  async error(messageOrData) {
    return await this.log(addLogLevelToPayload(messageOrData, 'ERROR'))
  }

  static async info(messageOrData, config) {
    return await new Logger(config).info(messageOrData)
  }

  async info(messageOrData) {
    return await this.log(addLogLevelToPayload(messageOrData, 'INFO'))
  }

  static async warn(messageOrData, config) {
    return await new Logger(config).warn(messageOrData)
  }

  async warn(messageOrData) {
    return await this.log(addLogLevelToPayload(messageOrData, 'WARN'))
  }

  static async debug(messageOrData, config) {
    return await new Logger(config).debug(messageOrData)
  }

  async debug(messageOrData) {
    return await this.log(addLogLevelToPayload(messageOrData, 'DEBUG'))
  }

  static async logInferLevel(messageOrData, config) {
    return await new Logger(config).logInferLevel(messageOrData)
  }

  async logInferLevel(messageOrData) {
    if (typeof messageOrData === 'string' || !messageOrData.status) {
      return await this.info(messageOrData)
    }

    const status = messageOrData.status

    if (status >= 400)
      return await this.warn(messageOrData)

    if (status >= 500)
      return await this.error(messageOrData)

    return await this.info(messageOrData)
  }
}