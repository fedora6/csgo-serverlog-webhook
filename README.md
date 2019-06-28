# csgo-serverlog-webhook
Webhook events from CSGO server log lines

By default listens for incoming server logs on port 3001, express API for adding/removing URLs also 3001.

`GET /api/webhook/get` - Get all URLs assigned to all events

`GET /api/webhook/get/:eventname` - Get all URLs assigned to given event

`POST /api/webhook/add/:eventname` - Add URL to given event, requires url in body

`DELETE /api/webhook/delete/:eventname` - Delete all URLs assigned to a given event

`POST /api/webhook/delete/:eventname` - Delete a given URL from given event, requires url in body

`POST /api/webhook/delete/` - Delete a given URL from all events, requires url in body


## Events

Every event has the following common structure:

```
{
  type: TYPE,
  server: {
    ip: IP,
    port: PORT
  },
  data: {
    date: MM/DD/YYYY,
    time: HH:MM:SS,
  }
}
```

Below is a list of all events, as well as any additional data items they contain:

- `damage`
  - source 
    - name
    - steam
    - team
    - coord
  - target
    - name
    - steam
    - team
    - coord
  - weapon
  - health
    - dealt
    - left
  - armour
    - dealt
    - left
    
- `kill`
  - source 
    - name
    - steam
    - team
    - coord
  - target
    - name
    - steam
    - team
    - coord
  - weapon
  - headshot
  - penetration
  
- `assist`
  - source 
    - name
    - steam
    - team
  - target
    - name
    - steam
    - team

- `flashassist`
  - source 
    - name
    - steam
    - team
  - target
    - name
    - steam
    - team
    
- `flashed`
  - source 
    - name
    - steam
    - team
  - target
    - name
    - steam
    - team
  - duration
  - entindex

- `throw`
  - source 
    - name
    - steam
    - team
  - grenade
    - type
    - coord
  - entindex (only if grenade type is flashbang)

- `projectile`
  - projectile
    - coord
    - velocity

- `purchased`
  - source 
    - name
    - steam
    - team
  - item

- `leftbuyzone`
  - source 
    - name
    - steam
    - team
  - items `array`

- `roundstart`

- `roundend`

- `freezetime`

- `playertriggered`
  - source 
    - name
    - steam
    - team
  - action

- `teamtriggered`
  - team
  - action
  - score
    - ct
    - t

- `teamscored`
  - team
  - score
  - alive

- `switchedteam`
  - source 
    - name
    - steam
    - team
  - target
    - team

- `say`
  - source 
    - name
    - steam
    - team
  - message

- `sayteam`
  - source 
    - name
    - steam
    - team
  - message

- `killedother`
  - source 
    - name
    - steam
    - team
    - coord
  - target
    - name
    - coord
  - weapon

- `get5, get5series, get5veto, get5map, get5misc`
  - get5
    - event
    - matchid
    - params `object`

- `connected`
  - source 
    - name
    - steam

- `enteredgame`
  - source 
    - name
    - steam

- `steamvalidated`
  - source 
    - name
    - steam

- `disconnected`
  - source 
    - name
    - steam
    - team

- `matchstart`
  - map

- `teamplaying`
  - team
    - side
    - name

- `gameover`
  - map
  - score
    - ct
    - t
  - duration

- `rcon`
  - source
  - message

- `sayconsole`
  - message

- `pause`

- `unpause`
