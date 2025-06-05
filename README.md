# juicy-logs-kit-core
The official logging tool for sending app logs and events to Juicy Logs from javascript applications.

This package is meant to abstract the boiler plate of sending logs and events to the Juicy Logs servers, as well as subscribing to the event pubsub.

This package is the core package which serves as the underlying logging library behind framework specific logs. If you need a framework specific log package, we currently support:

- SvelteKit: (juicy-logs-kit-svelte)[https://github.com/JuicyJah/juicy-logs-kit-svelte]

Signup for a free account at https://logs.juicyjah.com/signup and take the first step to a fresh and painless app logging and event pub/sub experience.

## How to use
1. Install the package with npm
```
npm i juicy-logs-kit-core
```

2. Import in your JavaScript.
```javascript
import { Logger } from "juicy-logs-kit-core"
```

3. In your environment variables, provide the URL and API token needed to access your logs at Juicy Logs.

```bash
#.env

...
JUICY_LOGS_URL=https://logs.juicyjah.com
JUICY_LOGS_TOKEN=your-token-here
JUICY_LOGS_SOURCE_NAME=your-app-name-here

```

4. Access your logs at https://logs.juicyjah.com

## Configure your logs

You can customize the logging behavior by passing a configuration object when initializing the Logger:

```javascript
// customer_logger.js
const logger = new Logger({
  log_debug: true,      // Enable/disable debug logs
  log_info: true,       // Enable/disable info logs
  log_error: true,      // Enable/disable error logs
  log_warn: true,       // Enable/disable warning logs
  log_http_methods: ['GET', 'POST', 'PUT', 'DELETE'],  // HTTP methods to log
  exclude_http_methods: [],  // HTTP methods to exclude from logging
  log_http_status_codes: [200, 201, 400, 401, 403, 404, 500], // Status codes to log
  exclude_http_status_codes: [], // Status codes to exclude from logging
  exclude_routes: ['/health-check'], // Routes to exclude from logging
  console: false        // Enable console logging in addition to sending to Juicy Logs
})

export default logger
```

All configuration options are optional and will use sensible defaults if not specified.

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| log_debug | boolean | true | Controls whether debug-level logs are processed and sent to Juicy Logs |
| log_info | boolean | true | Controls whether info-level logs are processed and sent to Juicy Logs |
| log_error | boolean | true | Controls whether error-level logs are processed and sent to Juicy Logs |
| log_warn | boolean | true | Controls whether warning-level logs are processed and sent to Juicy Logs |
| log_http_methods | string[] | ['CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT', 'TRACE'] | List of HTTP methods that should be logged |
| exclude_http_methods | string[] | [] | List of HTTP methods that should be excluded from logging. Takes precedence over log_http_methods |
| log_http_status_codes | number[] | [100-511] | List of HTTP status codes that should be logged. Defaults to all standard HTTP status codes |
| exclude_http_status_codes | number[] | [] | List of HTTP status codes that should be excluded from logging. Takes precedence over log_http_status_codes |
| exclude_routes | string[] | [] | List of route patterns that should be excluded from logging (e.g. ['/health-check', '/api/metrics']) |
| console | boolean | false | When true, logs will also be output to the console in addition to being sent to Juicy Logs |

## Using Events

Juicy Logs supports event pushing for tracking important application events. To use events:

```javascript
import { EventPusher } from "juicy-logs-kit-core"

// Create an event pusher instance
const eventPusher = new EventPusher()

// Push a simple event with just a message
await eventPusher.push("User logged in")

// Push a detailed event
await eventPusher.push({
  type: "user_action",        // Event type for categorization
  type_id: "login",          // Specific event identifier
  action: "login_successful", // The action that occurred
  message: "User successfully logged in",  // Human-readable message
  data: {                    // Additional event data
    userId: "123",
    timestamp: new Date(),
    browser: "Chrome"
  }
})

// You can also use the static method
await EventPusher.push({
  type: "system_event",
  message: "Application started"
})
```

Events require either a `type` or `type_id` field to be specified when sending detailed events. The `message` field is optional but recommended for better readability in your event logs.

### Event Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| type | string | Yes* | Category or classification of the event (e.g., 'user_action', 'system_event') |
| type_id | string | Yes* | Category or classification ID of the event (e.g., 'asflsdfuilur-134cadsrfq34-asfae23') |
| message | string | No | Human-readable description of the event |
| data | object | No | Additional structured data related to the event |
| source | string | No | Source of the event (defaults to JUICY_LOGS_SOURCE_NAME from env) |

\* Either `type` or `type_id` must be specified for detailed events

You can view your events in the Events section of your Juicy Logs dashboard at https://logs.juicyjah.com.

### TODO
- Add events pubsub subscription functionality
- Add more request metadata logging (headers, user agent, etc.)
- Add support for custom log formatters
- Add batch event processing
