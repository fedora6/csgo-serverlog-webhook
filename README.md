# csgo-serverlog-webhook
Webhook events from CSGO server log lines

By default listens for incoming server logs on port 3001, express API for adding/removing URLs also 3001.

GET /api/webhook/get - Get all URLs assigned to all events
GET /api/webhook/get/:eventname - Get all URLs assigned to given event
POST /api/webhook/add/:eventname - Add URL to given event, requires url in body
DELETE /api/webhook/delete/:eventname - Delete all URLs assigned to a given event
POST /api/webhook/delete/:eventname - Delete a given URL from given event, requires url in body
