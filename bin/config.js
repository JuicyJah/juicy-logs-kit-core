import "@sveltejs/kit"
import packageJSON from "../package.json" assert { type: "json" }

const PACKAGE_NAME = packageJSON.name
const PACKAGE_VERSION = packageJSON.version

function getConfig(overrides = {}) {
  const config = {
    token: getToken(),
    url: getURL(),
    source: getSourceName(),
    console: false,
    ...overrides,
    juicy_logs_version: PACKAGE_VERSION,
    juicy_logs_package: PACKAGE_NAME
  }

  if (!config.token)
    throw new Error('Missing token from config')

  if (!config.url)
    throw new Error('Missing url from config')

  if (!config.source)
    throw new Error('Missing source from config')

  return config
}

export default getConfig