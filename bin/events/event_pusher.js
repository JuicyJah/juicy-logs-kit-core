import getConfig from '../config.js'

async function send(config, data) {
  if (!config) return
  const { token, url, source } = config

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }

  const event = new Event(data, source, config)

  if (!event.type && !event.type_id) {
    console.error('JUICY_LOGS: Event type or type_id is required')
    return
  }

  const body = JSON.stringify(event)

  try {
    const response = await fetch(`${url}/api/events`, {
      method: 'POST',
      headers,
      body
    })

    if (!response.ok) {
      console.error('JUICY_LOGS: Error sending event:', response.statusText)
    }
  } catch (error) {
    console.error('JUICY_LOGS: Error sending event:', error)
  }
}

class Event {
  action
  type_id
  type
  message
  data
  constructor(data, source, config = {}) {
    if (typeof data === 'string') {
      this.message = data
    } else if (typeof data === 'object') {
      this.message = data?.message ?? "No message provided"
      Object.assign(this, data)
    }

    this.source = source

    const { juicy_logs_version, juicy_logs_package } = config
    if (juicy_logs_package)
      this.juicy_logs_package = juicy_logs_package
    if (juicy_logs_version)
      this.juicy_logs_version = juicy_logs_version
  }
}

export default class EventPusher {
  constructor(configOverrides) {
    this.config = getConfig(configOverrides)
  }

  static async push(...args) {
    return await new EventPusher().push(...args)
  }

  async push(messageOrData, overrides = {}) {
    await send(getConfig({ ...this.config, ...overrides }), messageOrData)
  }
}