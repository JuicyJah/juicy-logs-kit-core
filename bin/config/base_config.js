import packageJSON from "../../package.json" with { type: "json" }

const PACKAGE_NAME = packageJSON.name
const PACKAGE_VERSION = packageJSON.version

export default class JuicyLogsBaseConfig {
  constructor(overrides = {}) {
    this.token = process?.env?.JUICY_LOGS_TOKEN ?? null
    this.url = process?.env?.JUICY_LOGS_URL ?? null
    this.source = process?.env?.JUICY_LOGS_SOURCE ?? null
    this.console = false
    this.juicy_logs_version = PACKAGE_VERSION
    this.juicy_logs_package = PACKAGE_NAME

    Object.assign(this, overrides)

    if (!this.token)
      throw new Error('Missing token from config')

    if (!this.url)
      throw new Error('Missing url from config')

    if (!this.source)
      throw new Error('Missing source from config')
  }
}