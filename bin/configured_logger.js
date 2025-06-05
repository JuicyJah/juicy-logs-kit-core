import Logger from './logs/logger.js'

const HTTP_REQUEST_CODES = [
  100,
  101,
  102,
  103,
  200,
  201,
  202,
  203,
  204,
  205,
  206,
  207,
  208,
  226,
  300,
  301,
  302,
  303,
  304,
  305,
  306,
  307,
  308,
  400,
  401,
  402,
  403,
  404,
  405,
  406,
  407,
  408,
  409,
  410,
  411,
  412,
  413,
  414,
  415,
  416,
  417,
  418,
  421,
  422,
  423,
  424,
  425,
  426,
  428,
  429,
  431,
  451,
  500,
  501,
  502,
  503,
  504,
  505,
  506,
  507,
  508,
  509,
  510,
  511
]

const HTTP_METHODS = [
  'CONNECT',
  'DELETE',
  'GET',
  'HEAD',
  'OPTIONS',
  'PATCH',
  'POST',
  'PUT',
  'TRACE'
]

const DEFAULT_CONFIG = {
  log_debug: true,
  log_info: true,
  log_error: true,
  log_warn: true,
  log_http_status_codes: HTTP_REQUEST_CODES,
  exclude_http_status_codes: [],
  log_http_methods: HTTP_METHODS,
  exclude_http_methods: [],
  exclude_routes: []
}

export default class ConfiguredLogger extends Logger {
  constructor(config) {
    super()

    this.config = {
      ...DEFAULT_CONFIG,
      ...config
    }
  }

  async error(...args) {
    if (!this.config.log_error) return
    return await super.error(...args)
  }

  async info(...args) {
    if (!this.config.log_info) return
    return await super.info(...args)
  }

  async debug(...args) {
    if (!this.config.log_debug) return
    return await super.debug(...args)
  }

  async warn(...args) {
    if (!this.config.log_warn) return
    return await super.warn(...args)
  }
}